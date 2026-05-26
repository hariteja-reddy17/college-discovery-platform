import { NextResponse } from "next/server";
import { colleges } from "@/data/colleges";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return NextResponse.json(colleges);
}
