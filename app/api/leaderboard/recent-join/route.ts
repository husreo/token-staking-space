import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  try {
    const url =
      "https://api.spacefalcon.com/v1/referral/recent-joined?page=1&limit=50" as string;

    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const responseJson = await response.json();
    if (response.ok && response.status === 200)
      return NextResponse.json(responseJson);
    return NextResponse.json({});
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
