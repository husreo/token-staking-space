import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  try {
    const url = process.env.GAME_API as string;

    const response = await fetch(`${url}/v1/game/platform`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const responseJson = await response.json();
    if (response.ok && response.status === 200)
      return NextResponse.json(responseJson);
    return NextResponse.json({});
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
