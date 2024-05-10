import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
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
  try {
    const url = process.env.GAME_API as string;

    const response = await fetch(`${url}/v1/nft/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
    });
    const data = await response.json();
    if (response.ok && response.status === 200) {
      // const listNFTs = data?.nfts.map((nft: any) => nft) || [];
      // const allNFTsMetadata = await Promise.all(
      //   listNFTs.map(async (nft: any) => {
      //     const req = await fetch(`${url}/v1/nft/meta/${nft.nft_id}`, {
      //       method: "GET",
      //       headers: {
      //         Accept: "application/json",
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer ${session.access_token}`,
      //       },
      //     });
      //     const data = await req.json();
      //     return { ...data?.NFT, ...nft } || null;
      //   }),
      // );
      return NextResponse.json({
        data,
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
