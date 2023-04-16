import { config } from "../../lib/sanity/config";
import axios from "axios";

import aws from "aws-sdk";

const ses = new aws.SES({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

export default async function handler(req, res) {
  const projectId = config.projectId;
  const dataset = config.dataset;
  const tokenWithWriteAccess = process.env.SANITY_TOKEN;

  const {
    contactName,
    contactNumber,
    contactEmail,
    eventDate,
    eventAddress,
    headCount,
    additionalComments,
    eventCoordinates,
    kmsToDestination,
  } = req.body;

  console.log(eventCoordinates);

  if (req.method !== "POST") {
    return res.status(404).json({ message: "invalid method type" });
  }

  if (
    !contactName ||
    !contactNumber ||
    !contactEmail ||
    !eventDate ||
    !eventAddress ||
    !headCount ||
    !eventCoordinates ||
    !kmsToDestination
  ) {
    return res
      .status(400)
      .json({ message: "Please provide all necessary fields" });
  }

  const createMutations = [
    {
      create: {
        _type: "booking",
        contactName,
        contactNumber,
        contactEmail,
        eventDate,
        eventAddress,
        headCount: parseInt(req.body.headCount),
        additionalComments,
        eventCoordinates,
        kmsToDestination: parseFloat(kmsToDestination),
      },
    },
  ];

  try {
    const { data } = await axios.post(
      `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
      { mutations: createMutations },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${tokenWithWriteAccess}`,
        },
      }
    );

    const bookingId = data.results[0].id;

    //send email using aws ses
    const message = `
        Name:${contactName}\r\n
        email: ${contactEmail}\r\n
        phone: ${contactNumber}\r\n\r\n
        event Date: ${new Date(eventDate)}\r\n
        event Address: ${eventAddress}\r\n
        Event Coordinates: ${JSON.stringify(eventCoordinates)}\r\n
        Head Count: ${headCount}\r\n\r\n
        ${
          additionalComments
            ? `Additional Comments: ${additionalComments}\r\n`
            : null
        }
        Kms To Detination: ${kmsToDestination}\r\n`;

    const params = {
      Destination: {
        ToAddresses: ["bookings@hoppersunlimited.com.au"],
      },
      Message: {
        Body: {
          Text: {
            Data: message,
          },
          Html: {
            Data: getHtmlEmail(
              contactName,
              contactEmail,
              contactNumber,
              eventDate,
              eventAddress,
              eventCoordinates,
              headCount,
              kmsToDestination,
              additionalComments
            ),
          },
        },
        Subject: {
          Data: `New Booking - ${new Date()}`,
        },
      },
      Source: "tech@hoppersunlimited.com.au",
    };

    const result = await ses.sendEmail(params).promise();

    console.log("Email sent??", result);

    res
      .status(201)
      .json({ _id: bookingId, message: "booking submitted successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err_message: "booking submit error", err });
  }
}

function getHtmlEmail(
  contactName,
  contactEmail,
  contactNumber,
  eventDate,
  eventAddress,
  eventCoordinates,
  headCount,
  kmsToDestination,
  additionalComments
) {
  let html = "";

  // These are removed by gmail, so had to use inline styling
  // html += `<style type="text/css">`;
  // html += `   .container{width:100%;background-color:#bcccdc;display:flex;align-items:center;justify-content:center;padding:1rem;}`;
  // html += `   .table{width:80%;border:2px solid black; font-size:0.75rem;background-color:#fff;}`;
  // html += `   .table td{border:1px solid #d9e2ec;}`;
  // html += `   .heading {text-transform: uppercase; font-weight: bold;padding: 1rem;}`;
  // html += `</style>`;

  html += `<div class='container' style="width:100%;background-color:#bcccdc;padding:2rem 0;">`;
  html += `<table class='table' style="width:750px;border:2px solid black; font-size:0.85rem;background-color:#fff;margin:0 auto;padding:1rem">`;
  html += `   <tr><td class='heading' style="text-transform: uppercase; font-weight: 600;padding: 0.5rem;">contact name</td><td style="color: blue;">${contactName}</td></tr>`;
  html += `   <tr><td class='heading' style="text-transform: uppercase; font-weight: 600;padding: 0.5rem;">contact email</td><td>${contactEmail}</td></tr>`;
  html += `   <tr><td class='heading' style="text-transform: uppercase; font-weight: 600;padding: 0.5rem;">contact number</td><td>${contactNumber}</td></tr>`;
  html += `   <tr><td class='heading' style="text-transform: uppercase; font-weight: 600;padding: 0.5rem;">event Date</td><td>${new Date(
    eventDate
  )}</td></tr>`;
  html += `   <tr><td class='heading' style="text-transform: uppercase; font-weight: 600;padding: 0.5rem;">event Address</td><td>${eventAddress}</td></tr>`;
  html += `   <tr><td class='heading' style="text-transform: uppercase; font-weight: 600;padding: 0.5rem;">event Coordinates</td><td>${JSON.stringify(
    eventCoordinates
  )}</td></tr>`;
  html += `   <tr><td class='heading' style="text-transform: uppercase; font-weight: 600;padding: 0.5rem;">Head Count</td><td>${headCount}</td></tr>`;
  html += `   <tr><td class='heading' style="text-transform: uppercase; font-weight: 600;padding: 0.5rem;">kms to destination</td><td>${kmsToDestination}</td></tr>`;
  additionalComments
    ? (html += `   <tr><td class='heading' style="text-transform: uppercase; font-weight: 600;padding: 0.5rem;">Additional Comments</td><td>${additionalComments}</td></tr>`)
    : null;
  html += `</table>`;
  html += `</div>`;

  return html;
}
