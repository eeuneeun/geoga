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
    // 쿼리 파라미터에서 start, end 꺼내오기
    const { searchParams } = new URL(req.url);
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    // 문자열을 Date 객체로 변환
    const startDate = start ? new Date(start) : undefined;
    const endDate = end ? new Date(end) : undefined;

    const ledger = await prisma.ledger.findMany({
      where: {
        start: {
          ...(startDate && { gte: startDate }),
          ...(endDate && { lte: endDate }),
        },
      },
    });
    return NextResponse.json(ledger, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
