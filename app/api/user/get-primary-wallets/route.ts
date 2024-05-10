import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
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

    const url = process.env.GAME_API as string;

    const response = await fetch(`${url}/v1/balance/primary-wallets`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
    });
    const responseJson = await response.json();

    //if responsjson is an array return it otherwise return an empty array
    if (Array.isArray(responseJson)) {
      return NextResponse.json(responseJson);
    }

    return NextResponse.json([]);
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
