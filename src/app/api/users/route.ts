import { gorestService } from "@/modules/gorest/gorest.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const response = await gorestService.getUsers({
    page: parseInt(req.nextUrl.searchParams.get("page") as string),
    per_page: parseInt(req.nextUrl.searchParams.get("per_page") as string),
  });
  return Response.json(response.data);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const response = await gorestService.createUser(data);
  return Response.json(response.data);
}
