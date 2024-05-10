import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
  const expectedKeys = ["new_password", "old_password"];
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
  if (Object.keys(res).length) {
    try {
      const response = await fetch(`${url}/change-password`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          new_password: res.new_password,
          old_password: res.old_password,
        }),
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
}
