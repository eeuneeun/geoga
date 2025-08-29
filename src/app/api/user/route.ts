import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../_lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, password, name, email } = await req.json();
    const user = await prisma.user.create({
      data: { userId, password, name, email },
    });
    // res.status(201).json(user);
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId, password } = await req.json();
    const user = await prisma.user.findUnique({
      where: { userId, password },
    });
    // res.status(201).json(user);
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
