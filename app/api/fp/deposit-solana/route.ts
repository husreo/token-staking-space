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
      "from_address",
      "to_address",
      "tx_hash",
      "amount",
      "fp_amount",
      "chain",
      "token",
      "is_native",
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

    const encodeURL = encodeURI(
      `${url}/v1/balance/deposit-solana?chain=${res.chain}`,
    );
    console.log(encodeURL);
    const response = await fetch(encodeURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-API-Key": process.env.X_API_KEY as string,
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        from_address: res.from_address,
        to_address: res.to_address,
        token: res.token,
        hash: res.tx_hash,
        fp_amount: res.fp_amount,
        amount: res.amount,
        is_native: res.is_native,
        is_deposit_fcon: res.is_deposit_fcon,
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
