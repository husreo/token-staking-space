import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
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

    const url = process.env.GAME_API as string;
    const res = await req.json();
    const missingKeys = ["username"].filter((key) => !(key in res));

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
      `${url}/api/v1/user/profile/change-username`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
          "X-API-Key": process.env.X_API_KEY as string,
        },
        body: JSON.stringify({
          username: res.username
        }),
      },
    );
    const responseJson = await response.json();
    if (response.ok && response.status === 200) {
      return NextResponse.json({ data: responseJson.data });
    } else {
      return NextResponse.json({ error: true, data: { ...responseJson } });
    }
  } catch (error: any) {
    return NextResponse.json({
      error: true,
      data: {
        message: JSON.stringify({ ...error })
      }
    });
  }
}
