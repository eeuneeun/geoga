import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ userId: params.id, action: "조회" });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  return NextResponse.json({ userId: params.id, action: "수정", data: body });
}
