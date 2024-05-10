import { getPlatformStats } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
  try {
    const response = await getPlatformStats();

    return NextResponse.json(response);
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        ...error,
      }),
      {
        status: 500,
      },
    );
  }
}
