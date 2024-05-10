import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = process.env.GAME_API as string;
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
    const response = await fetch(url + "/v1/tournament/ticket/owned", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
        "X-API-Key": process.env.X_API_KEY as string,
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
