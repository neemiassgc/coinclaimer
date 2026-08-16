import { getCoins } from "@/app/habitica";
import { NextResponse } from "next/server";

export async function GET() {
  const coins = await getCoins();
  return new NextResponse(coins.toFixed(2), {
    status: 200,
    headers: {
      "Content-Type": "text/html"
    }
  });
}