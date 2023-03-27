import { config } from "../../lib/sanity/config";
import axios from "axios";

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
  } = req.body;

  if (req.method !== "POST") {
    return res.status(404).json({ message: "invalid method type" });
  }

  if (
    !contactName ||
    !contactNumber ||
    !contactEmail ||
    !eventDate ||
    !eventAddress ||
    !headCount
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
    res
      .status(201)
      .json({ _id: bookingId, message: "booking submitted successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err_message: "booking submit error", err });
  }
}
