import { gorestService } from "@/modules/gorest/gorest.service";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const response = await gorestService.getUser(id);
  return Response.json(response.data);
}
