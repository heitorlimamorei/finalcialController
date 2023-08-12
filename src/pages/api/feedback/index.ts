import type { NextApiRequest, NextApiResponse } from "next";
import feedBackService from "../../../backEnd/services/feedBack.service";

export default async function feedBackRouter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const formData: any = req.body;
    try {
    if (req.method === "POST") {
      res.status(200).json(await feedBackService.createFeedBack(formData));
    } else if (req.method === "GET"){
      res.status(200).json(await feedBackService.getFeedBacks());
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}
