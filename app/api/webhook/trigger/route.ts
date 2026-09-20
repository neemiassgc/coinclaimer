import { createTasks } from "@/app/integration/habitica";
import { hasToday } from "@/app/integration/notion";
import { NextResponse } from "next/server";

export async function GET() {
  if (await hasToday()) {
    await createTasks([
      "2P - Praticar leitura em voz alta | 13:00 ~ 14:00",
      "6P - Consumir Pomodoros com trabalho de alto valor | 14:00 ~ 17:20",
      "2P - Praticar Duolingo | 17:20 ~ 18:20",
      "6P - Consumir Pomodoros com trabalho de alto valor | 18:20 ~ 21:40",
    ].reverse())
  }

  return new NextResponse("Executed!", {
    headers: {
      "Content-Type": "text/html"
    },
    status: 200
  });
}