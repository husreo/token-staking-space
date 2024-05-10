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
    const { searchParams } = new URL(req.url);
    const wallet_address = searchParams.get("wallet_address");
    const chain = searchParams.get("chain");
    const collection = searchParams.get("collection");
    if (!wallet_address) {
      return new Response(
        JSON.stringify({
          error: `Missing parameters: wallet_address`,
        }),
        {
          status: 500,
        },
      );
    }
    if (!chain) {
      return new Response(
        JSON.stringify({
          error: `Missing parameters: chain`,
        }),
        {
          status: 500,
        },
      );
    }
    if (!collection) {
      return new Response(
        JSON.stringify({
          error: `Missing parameters: collection`,
        }),
        {
          status: 500,
        },
      );
    }
    const response = await fetch(
      `${url}/v1/nft/ownership?wallet_address=${wallet_address}&chain=${chain}&collection=${collection}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      },
    );
    const data = await response.json();
    if (response.ok && response.status === 200) {
      const listNFTs: Number[] = data?.nfts || [];
      const allNFTsMetadata = await Promise.all(
        listNFTs.map(async (id) => {
          const req = await fetch(`${url}/v1/nft/meta/${id}`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            next: {
              revalidate: 1800,
            },
            cache: "force-cache",
          });
          const data = await req.json();
          return data?.NFT || null;
        }),
      );
      return NextResponse.json({
        allNFTsMetadata,
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
