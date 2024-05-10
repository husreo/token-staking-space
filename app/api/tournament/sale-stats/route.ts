import { NextResponse } from "next/server";

export async function GET(_req: Request) {
  try {
    const url = process.env.GAME_API as string;

    const response = await fetch(url + "/v1/tournament/sales-stats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    const responseJson = await response.json();

    return NextResponse.json({ ...responseJson });
  } catch (error: any) {
    console.log(error);
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
