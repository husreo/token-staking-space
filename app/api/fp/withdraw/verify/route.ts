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
    const expectedKeys = ["tx_id", "otp_code", "is_nft", "chain"];
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
      `${url}/v1/transaction/verify-tx?chain=${res.chain}`,
    );
    console.log(
      {
        tx_id: res.tx_id,
        otp_code: res.otp_code,
        is_nft: res.is_nft,
      },
      encodeURL,
    );
    const response = await fetch(encodeURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        tx_id: res.tx_id,
        otp_code: res.otp_code,
        is_nft: res.is_nft,
      }),
    });

    const responseJson = await response.json();
    if (response.status === 200) {
      return NextResponse.json({ ...responseJson });
    } else {
      return new Response(
        JSON.stringify({
          message: responseJson.message,
        }),
        {
          status: response.status,
        },
      );
    }
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
