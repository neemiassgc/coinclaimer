import { headers } from "@/app/integration/habitica";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestBody = await request.json();
  const gp: string = requestBody.gp;
  const response = await subtractCoins(gp);
  return new NextResponse(response.body, { status: response.status });
}

async function subtractCoins(value: string) {
  return await fetch("https://habitica.com/api/v3/user",  {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({ "stats.gp": value })
  })
}