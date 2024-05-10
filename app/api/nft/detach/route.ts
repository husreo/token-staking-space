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
  const expectedKeys = [
    "wallet_address",
    "token_id",
    "chain",
    "collection",
    "tx_hash",
  ];
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
      const response = await fetch(
        `${url}/v1/nft/detach-from-profile?chain=${res.chain}&collection=${res.collection}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            wallet_address: res.wallet_address,
            token_id: res.token_id,
            tx_hash: res.tx_hash,
          }),
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
}
