import { NextResponse } from "next/server";

export async function GET(_req: Request) {
  try {
    const url = process.env.GAME_API as string;

    const response = await fetch(`${url}/v1/token/price?token_name=FCON`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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
