import { config } from "../../lib/sanity/config";
import axios from "axios";

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

    //send email using sendgrid
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

    const emailData = {
      to: "tech@hoppersunlimited.com.au",
      from: "bookings@hoppersunlimited.com.au",
      subject: `New Booking - ${new Date()}`,
      text: message,
      html: message.replace(/\r\n/g, "<br>"),
    };

    await sgMail.send(emailData);

    res
      .status(201)
      .json({ _id: bookingId, message: "booking submitted successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err_message: "booking submit error", err });
  }
}
