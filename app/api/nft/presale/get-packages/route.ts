import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
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
  const url = process.env.GAME_API as string;
  try {
    const response = await fetch(`${url}/v1/presale/user/packages`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
        "X-API-Key": process.env.X_API_KEY as string,
      },
    });
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
