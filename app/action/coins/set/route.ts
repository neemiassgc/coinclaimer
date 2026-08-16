import { setCoins } from "@/app/habitica";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestBody = await request.json();
  const gp: string = requestBody.gp;
  const response = await setCoins(gp);
  return new NextResponse(response.body, { status: response.status });
}