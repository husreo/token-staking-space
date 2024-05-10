import { NextResponse } from "next/server";
import { addReqParams } from "utils/string";

export async function GET(req: Request) {
  try {
    const url = process.env.GAME_API as string;
    const reqURL = new URL(req.url);
    const reqSearchParams = reqURL.searchParams;
    const expectedKeys = ["date_from", "date_to", "interval", "stats_type"];
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

    const excludeStatsTypeSearchParams = new URLSearchParams(reqSearchParams);
    excludeStatsTypeSearchParams.delete("stats_type");

    const response = await fetch(
      addReqParams(
        `${url}/v1/stats/spacefalcon/${reqSearchParams.get("stats_type")}`,
        excludeStatsTypeSearchParams.entries(),
      ),
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
    if (response.ok && response.status === 200) {
      return NextResponse.json(responseJson);
    }
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
