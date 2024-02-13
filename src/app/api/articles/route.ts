import { gorestService } from "@/modules/gorest/gorest.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const response = await gorestService.getPosts({
    page: parseInt(req.nextUrl.searchParams.get("page") as string),
    per_page: parseInt(req.nextUrl.searchParams.get("per_page") as string),
  });

  return Response.json(response.data);
}
