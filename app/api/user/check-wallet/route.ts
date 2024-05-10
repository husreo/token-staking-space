import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.access_token) {
      return new Response(
        JSON.stringify({
          message: "Unauthorized",
          data: [],
        }),
        {
          status: 403,
        },
      );
    }
    const url = process.env.GAME_API as string;
    const { searchParams } = new URL(req.url);
    const wallet_address = searchParams.get("wallet_address");

    const response = await fetch(
      `${url}/v1/user/check-wallet?wallet=${wallet_address}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    if (response.ok && response.status === 200) {
      return NextResponse.json({
        ...data,
      });
    } else {
      throw data;
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
