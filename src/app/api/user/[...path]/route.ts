import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { path: string[] } }
) {
  return NextResponse.json({ fullPath: params.path });
  // 👉 /api/user/a/b/c → { "fullPath": ["a","b","c"] }
}
