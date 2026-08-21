import { getCoins, getTaskDetail, getTaskGroup, setCoins } from "@/app/integration/habitica";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const secretFromHeader = request.headers.get("gcp-secret");
  const storedSecret = process.env["GCP_SECRET"] as string;
  if (!secretFromHeader || secretFromHeader !== storedSecret)
    return new NextResponse("Not Accepted", { status: 400 });
  await scan();
  return new NextResponse("Ok", { status: 200 });
}

async function scan(): Promise<void> {
  const taskGroup = await getTaskGroup();
  const habitTaskDetail = await getTaskDetail(taskGroup.habit[0]);
  if (habitTaskDetail.data.counterUp === 0) {
    await setCoins("0");
    return;
  }

  for (const taskId of taskGroup.daily) {
    const dailyTaskDetail = await getTaskDetail(taskId);
    if (!dailyTaskDetail.data.completed) {
      await cutInHalf();
      return;
    }
  }


  for (const taskId of taskGroup.todo) {
    const todoTaskDetail = await getTaskDetail(taskId);
    if (isToday(todoTaskDetail.data.date)) {
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