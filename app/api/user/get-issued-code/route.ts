import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { sleep } from "utils/promise";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(
        JSON.stringify({
          message: "Unauthorized",
        }),
        {
          status: 403,
        },
      );
    }
    const expectedKeys = ["tx_hash", "chain"];
    const res = await req.json();
    const missingKeys = expectedKeys.filter((key) => !(key in res));

    if (missingKeys.length > 0) {
      return new Response(
        JSON.stringify({
          error: `Missing parameters: ${missingKeys.join(", ")}`,
        }),
        {
          status: 500,
        },
      );
    }
    const url = process.env.GAME_API as string;
    const response = await fetch(`${url}/api/v1/user/login-code/issue`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
        "X-API-Key": process.env.X_API_KEY as string,
      },
      body: JSON.stringify(res),
    });
    await sleep(2000);
    //get data from response
    const t = await response.text();
    const data = JSON.parse(t);
    if (response.ok && (response.status === 200 || response.status === 201)) {
      return NextResponse.json({
        ...data,
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
