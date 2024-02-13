import { gorestService } from "@/modules/gorest/gorest.service";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const response = await gorestService.getPost(parseInt(params.id as string));

  return Response.json(response.data);
}
