import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../_lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { category, memo, price, start, end } = await req.json();
    const ledger = await prisma.ledger.create({
      data: {
        category,
        memo,
        price,
        start,
        end,
      },
    });
    // res.status(201).json(user);
    return NextResponse.json(ledger, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const ledger = await prisma.ledger.findMany();
    return NextResponse.json(ledger, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
