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
    "from_address",
    "tx_hash",
    "to_address",
    "token_addresses",
    "chain",
    "collection",
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
        `${url}/v1/nft/add-to-profile?chain=${res.chain}&collection=${res.collection}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
            "X-API-Key": process.env.X_API_KEY as string,
          },
          body: JSON.stringify({
            from_address: res.from_address,
            to_address: res.to_address,
            tx_hash: res.tx_hash,
            token_addresses: res.token_addresses,
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
