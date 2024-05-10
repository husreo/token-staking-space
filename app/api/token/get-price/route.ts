import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = process.env.GAME_API as string;
    const reqURL = new URL(req.url);
    const reqSearchParams = reqURL.searchParams;

    const expectedKeys = ["symbol"];
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
      `${url}/api/v1/token/price?token_name=${reqSearchParams.get("symbol")}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": process.env.X_API_KEY as string,
        },
        cache: "no-cache",
      },
    );
    const t = await response.text();
    const data = JSON.parse(t);
    const returnData = {
      ...data?.data,
      test: response.status,
    };
    if (response.ok) {
      return NextResponse.json({
        ...returnData,
      });
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
