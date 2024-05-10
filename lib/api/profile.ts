import { Metaplex } from "@metaplex-foundation/js";
import { PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { Connection, PublicKey } from "@solana/web3.js";
import { sleep } from "utils/promise";

export const getProfileWalletNFTs = async (params: {
  connection: Connection;
  wallet_address: string;
  collection_address?: string;
}) => {
  const walletAddress = params.wallet_address;
  const metaplex = new Metaplex(params?.connection);
  const userNfts = await metaplex
    .nfts()
    .findAllByOwner({ owner: new PublicKey(walletAddress) });
  const filteredNfts = !!params.collection_address
    ? userNfts.filter((nft) => {
        // @ts-ignore
        return nft.mintAddress.toBase58() === params.collection_address;
      })
    : userNfts;

  return filteredNfts.filter((nft) => nft.symbol.toLowerCase() === "fcon");
};

export const getProfileNftDetail = async (
  token: any,
  metaplex: any,
  seed1: any,
  seed2: any,
  seed4: any,
) => {
  // @ts-ignore
  const mintPublickey = token.mintAddress;
  const mint = mintPublickey.toBase58();
  let name = token?.name.trim();
  let logoURI: string;
  const collectionAddress = token?.collection?.address;
  let collectionMetadata: string | undefined = undefined;

  if (collectionAddress) {
    const [collectionMetadataPDA, _bump3] = PublicKey.findProgramAddressSync(
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
  const metadataAccount = token?.address.toBase58();
  const NFTloaded = await metaplex
    .nfts()
    .findByMint({ mintAddress: mintPublickey });

  if (name == "" && NFTloaded.json?.name && NFTloaded.json?.name != "") {
    name = NFTloaded.json?.name.trim();
  }

  if (NFTloaded.json?.image && NFTloaded.json?.image != "") {
    logoURI = NFTloaded.json?.image;
  } else {
    logoURI = "https://arweave.net/WCMNR4N-4zKmkVcxcO2WImlr2XBAlSWOOKBRHLOWXNA";
  }

  // @ts-ignore
  const isMasterEdition = NFTloaded?.edition?.isOriginal;
  // const edition = NFTloaded.

  return {
    name,
    logoURI,
    metadataAccount,
    mint,
    masterEditionPDA,
    collectionMetadata,
    isMasterEdition,
  };
};

export const getPrimaryWallet = async () => {
  const req = await fetch("/api/user/get-primary-wallets", {
    method: "GET",
  });
  const data = await req.json();
  return data?.length > 0 ? data : [];
};

export const checkWalletExisted = async (address: string) => {
  const checkWalletReq = await fetch(
    "/api/user/check-wallet?wallet_address=" + address,
  );
  const data = await checkWalletReq.json();

  return data?.message?.toLowerCase() !== "ok" ? "existed" : "not_existed";
};

export const setPrimaryWallet = async (wallet_address: string) => {
  await sleep(2000);
  const req = await fetch("/api/user/set-primary-wallet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      wallet_address,
    }),
  });
  const data = await req.json();
  await sleep(2000);
  return data;
};
