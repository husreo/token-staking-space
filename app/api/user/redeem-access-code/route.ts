import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.access_token) {
      return new Response(
        JSON.stringify({
          message: "Unauthorized",
        }),
        {
          status: 403,
        },
      );
    }

    const expectedKeys = ["code"];
    const url = process.env.GAME_API as string;
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
    const response = await fetch(`${url}/v1/access-code/redeem`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        code: res.code,
      }),
    });
    const responseJson = await response.json();
    if (response.status === 200 && response.ok) {
      return NextResponse.json({ ...responseJson });
    } else {
      return new Response(
        JSON.stringify({
          ...responseJson,
        }),
        {
          status: response.status,
        },
      );
    }
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
