import { Metaplex } from "@metaplex-foundation/js";
import { PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { utils } from "@project-serum/anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useState } from "react";

export default function useSolanaNfts() {
  const { connection } = useConnection();

  const [userNFT, setUserNFT] = useState<any | null>(null);
  const getNFTByMints = async (params: { mints: PublicKey[] }) => {
    const req = await fetch("/api/nft/get-metadata", {
      method: "POST",
      body: JSON.stringify({
        mints: params.mints,
      }),
    });

    const data = await req.json();
    console.log(data);

    return data;
  };

  const getSolanaWalletNFTs = async (params: {
    wallet_address: string;
    collection_address?: string;
  }) => {
    const metaplex = new Metaplex(connection);
    const userNfts = await metaplex
      .nfts()
      .findAllByOwner({ owner: new PublicKey(params.wallet_address) });

    const filteredNfts = !!params.collection_address
      ? userNfts.filter((nft) => {
          // @ts-ignore
          return nft.mintAddress.toBase58() === params.collection_address;
        })
      : userNfts;

    const seed1 = Buffer.from(utils.bytes.utf8.encode("metadata"));
    const seed2 = Buffer.from(PROGRAM_ID.toBytes());
    const seed4 = Buffer.from(utils.bytes.utf8.encode("edition"));

    const userNFTMetadata = await Promise.all(
      filteredNfts.map(async (token) => {
        // @ts-ignore
        const mintPublickey = token.mintAddress;
        const mint = mintPublickey.toBase58();
        let name = token.name.trim();
        let logoURI: string;
        const collectionAddress = token.collection?.address;
        let collectionMetadata: string | undefined = undefined;

        if (collectionAddress) {
          const [collectionMetadataPDA, _bump3] =
            PublicKey.findProgramAddressSync(
              [seed1, seed2, Buffer.from(collectionAddress.toBytes())],
              PROGRAM_ID,
            );
          collectionMetadata = collectionMetadataPDA.toBase58();
        }
        const seed3 = Buffer.from(mintPublickey.toBytes());
        const [_masterEditionPDA, _bump2] = PublicKey.findProgramAddressSync(
          [seed1, seed2, seed3, seed4],
          PROGRAM_ID,
        );
        const masterEditionPDA = _masterEditionPDA.toBase58();
        const metadataAccount = token.address.toBase58();
        const NFTloaded = await metaplex
          .nfts()
          .findByMint({ mintAddress: mintPublickey });

        if (name == "" && NFTloaded.json?.name && NFTloaded.json?.name != "") {
          name = NFTloaded.json?.name.trim();
        }
        console.log(NFTloaded);
        if (NFTloaded.json?.image && NFTloaded.json?.image != "") {
          logoURI = NFTloaded.json?.image;
        } else {
          logoURI =
            "https://arweave.net/WCMNR4N-4zKmkVcxcO2WImlr2XBAlSWOOKBRHLOWXNA";
        }

        // @ts-ignore
        const isMasterEdition = NFTloaded?.edition?.isOriginal;
        // const edition = NFTloaded.
        const tokenAccount = (
          await Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            mintPublickey,
            new PublicKey(params.wallet_address),
          )
        ).toBase58();

        return {
          name,
          logoURI,
          metadataAccount,
          mint,
          tokenAccount,
          masterEditionPDA,
          collectionMetadata,
          isMasterEdition,
        };
      }),
    );
    userNFTMetadata.sort(function (a, b) {
      if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1;
      }
      if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
      }
      return 0;
    });

    setUserNFT(userNFTMetadata);
  };
  return { getSolanaWalletNFTs, userNFT, getNFTByMints };
}
