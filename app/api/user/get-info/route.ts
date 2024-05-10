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
        }),
        {
          status: 403,
        },
      );
    }

    const url = process.env.GAME_API as string;
    
    const response = await fetch(
      `${url}/get-user?include_social=true&include_rank_score=true`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      },
    );
    const responseJson = await response.json();

    if (responseJson.data) {
      return NextResponse.json({ data: responseJson.data });
    }
    return NextResponse.json({ data: [] });
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
