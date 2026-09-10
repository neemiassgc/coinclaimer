import { getCoins, getTasksGroupedByType, setCoins } from "@/app/integration/habitica";
import { NextRequest, NextResponse } from "next/server"
import 'temporal-polyfill/global'

export async function GET(request: NextRequest) {
  const secretFromHeader = request.headers.get("gcp-secret");
  const storedSecret = process.env["GCP_SECRET"] as string;
  if (!secretFromHeader || secretFromHeader !== storedSecret)
    return new NextResponse("Not Accepted", { status: 400 });
  await scan();
  return new NextResponse("Ok", { status: 200 });
}

async function scan(): Promise<void> {
  const taskGroup = await getTasksGroupedByType();
  const habitTaskDetail = taskGroup.habit[0];
  if (habitTaskDetail.counterUp === 0) {
    await setCoins("0");
    return;
  }

  for (const dailyTaskDetail of taskGroup.daily) {
    if (dailyTaskDetail.isDue && !dailyTaskDetail.completed) {
      await cutInHalf();
      return;
    }
  }

  for (const todoTaskDetail of taskGroup.todo) {
    if (isToday(todoTaskDetail.date)) {
      await cutInHalf();
      return;
    }
  }
}

function isToday(isoUtc: string): boolean {
  const timezoneId = "America/Sao_Paulo";
  
  const target = Temporal.Instant.from(isoUtc)
    .toZonedDateTimeISO(timezoneId)
    .toPlainDate();

  const today = Temporal.Now.plainDateISO(timezoneId);

  return target.equals(today);
}

async function cutInHalf(): Promise<void> {
  const currentAmountOfCoins = await getCoins();
  const updatedAmountOfCoins = Math.round(currentAmountOfCoins / 2);
  await setCoins(updatedAmountOfCoins+"");
}