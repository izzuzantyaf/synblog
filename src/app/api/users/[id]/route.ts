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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const data = await req.json();
  const response = await gorestService.updateUser(id, data);
  return Response.json(response.data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const response = await gorestService.deleteUser(id);
  return Response.json(response.data);
}
