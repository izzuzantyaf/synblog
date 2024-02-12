import { gorestService } from "@/modules/gorest/gorest.service";
import { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const response = await gorestService.getPost(
        parseInt(req.query.id as string)
      );

      return res.status(response.status).json(response.data);
    } else {
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error("/api/posts/:id error: ", error);
    if (error instanceof AxiosError) {
      const response = error.response?.data ?? { message: error.message };
      return res.status(error.status as number).json(response);
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
