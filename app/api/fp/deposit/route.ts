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
    const expectedKeys = [
      "tx_hash",
      "transfer_amount",
      "fp_amount",
      "wallet_address",
      "chain",
    ];
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

    const encodeURL = encodeURI(`${url}/v1/balance/deposit?chain=${res.chain}`);

    const response = await fetch(encodeURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        wallet_address: res.wallet_address,
        tx_hash: res.tx_hash,
        transfer_amount: res.transfer_amount,
        fp_amount: res.fp_amount,
      }),
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
