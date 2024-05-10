import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(_req: Request) {
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
    const encodeURL = encodeURI(`${url}/verify`);
    const response = await fetch(encodeURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });
    const responseJson = await response.json();
    return NextResponse.json({ ...responseJson });
  } catch (error) {
    throw new Error();
  }

  //   const data = await response.json();
  //   if (response.ok && response.status === 200) {
  //     return NextResponse.json({
  //       ...data,
  //     });
  //   } else {
  //     return NextResponse.json({ ...data });
  //   }
}
