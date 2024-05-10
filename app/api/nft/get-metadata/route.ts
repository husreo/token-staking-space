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
          data: [],
        }),
        {
          status: 403,
        },
      );
    }
    const expectedKeys = ["mints"];
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

    const url =
      "https://api.helius.xyz/v0/token-metadata?api-key=de0488fc-1b00-4268-b2df-137dc6cb3035";
    if (res?.mints.length === 0) {
      return NextResponse.json({ data: [] });
    }
    const nftAddresses: any = [...res.mints]; // Monkes'
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mintAccounts: nftAddresses,
        includeOffChain: true,
        disableCache: false,
      }),
    });

    const responseJson = await response.json();

    return NextResponse.json({ data: responseJson });
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
