import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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
    const expectedKeys = ["to_address", "fcon_amount"];
    const url = process.env.GAME_API as string;
    const res = await req.json();
    const missingKeys = expectedKeys.filter((key) => !(key in res));

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

    const encodeURL = encodeURI(
      `${url}/v1/balance/withdraw-fcon-solana?chain=solana-mainnet-beta`,
    );
    const response = await fetch(encodeURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-API-Key": process.env.X_API_KEY as string,
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        to_address: res.to_address,
        fcon_amount: res.fcon_amount,
      }),
    });
    const responseJson = await response.json();
    return NextResponse.json({ ...responseJson });
  } catch (error) {
    throw new Error();
  }
}
