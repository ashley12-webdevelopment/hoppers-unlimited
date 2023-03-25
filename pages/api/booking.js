import { config } from "../../lib/sanity/config";
import axios from "axios";

export default async function handler(req, res) {
  const projectId = config.projectId;
  const dataset = config.dataset;
  const tokenWithWriteAccess = process.env.SANITY_TOKEN;

  const createMutations = [
    {
      create: {
        _type: "booking",
        contactName: req.body.contactName,
        contactNumber: req.body.contactNumber,
        contactEmail: req.body.contactEmail,
        eventDate: req.body.eventDate,
        eventAddress: req.body.eventAddress,
        headCount: parseInt(req.body.headCount),
        additionalComments: req.body.additionalComments,
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
    res.status(200).json({ _id: bookingId, message: "submission successful" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ err_message: "submission error" });
  }
}
