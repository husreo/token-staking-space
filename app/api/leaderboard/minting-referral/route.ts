import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  try {
    const url = process.env.GAME_API as string;
    const reqURL = new URL(req.url);
    const reqSearchParams = reqURL.searchParams;
    const expectedKeys = ["page", "page_size"];
    const missingKeys = expectedKeys.filter((key) => !reqSearchParams.has(key));

    if (missingKeys.length) {
      return new Response(
        JSON.stringify({
          message: `${missingKeys.join(", ")} is(are) missing`,
        }),
        {
          status: 500,
        },
      );
    }
    const response = await fetch(
      `${url}/api/v1/leaderboard/referral?page=${reqSearchParams.get(
        "page",
      )}&page_size=${reqSearchParams.get("page_size")}`,
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
