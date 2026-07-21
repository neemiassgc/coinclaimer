import { NextResponse } from "next/server";
import headers from "../headers";

export async function GET() {
  const res = await fetch("https://habitica.com/api/v3/user/anonymized", {
    method: "GET",
    headers: headers(),
  });
  const response = await res.json();
  const coins = response.data.user.stats.gp
  return new NextResponse(coins.toFixed(2), {
    status: res.status,
    headers: {
      "Content-Type": "text/html"
    }
  });
}