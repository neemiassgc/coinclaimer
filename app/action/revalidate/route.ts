import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  revalidatePath("/")
  return new NextResponse("ok", {
    status: 200,
  });
}