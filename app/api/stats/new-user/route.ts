import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = process.env.GAME_API as string;
    const reqURL = new URL(req.url);
    const reqSearchParams = reqURL.searchParams;
    const expectedKeys = ["date_from", "date_to", "interval"];
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
      `${url}/v1/stats/spacefalcon/new-user?date_from=${reqSearchParams.get(
        "date_from",
      )}&date_to=${reqSearchParams.get(
        "date_to",
      )}&interval=${reqSearchParams.get("interval")}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();
    if (response.ok && response.status === 200 && data.data) {
      return NextResponse.json([...data.data]);
    } else {
      throw data;
    }
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
