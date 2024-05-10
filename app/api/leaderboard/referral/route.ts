import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  try {
    const url = process.env.GAME_API as string;
    // const url = "https://api.spacefalcon.com" as string;
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    if (!page) {
      return new Response(
        JSON.stringify({
          error: `Missing parameters: page`,
        }),
        {
          status: 500,
        },
      );
    }
    if (!limit) {
      return new Response(
        JSON.stringify({
          error: `Missing parameters: limit`,
        }),
        {
          status: 500,
        },
      );
    }

    const response = await fetch(
      `${url}/v1/referral/leader-board?page=${page}&limt=${limit}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );
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
