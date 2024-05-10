import axios from "axios";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";
import {
  SignerWalletAdapterProps,
  WalletAdapterProps,
} from "@solana/wallet-adapter-base";
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  erc721ABI,
  prepareWriteContract,
  readContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import CIABI from "constants/CONTRACT_INTERACTION_ABI.json";
import ERC721 from "constants/ERC71ABI.json";
import {
  ADDRESS_WALLET_NFT,
  CHAIN_SYMBOL,
  MAX_TRANSFERABLE_NFT,
} from "constants/payment";
import { NFTMetada } from "types/nft";
import { sleep } from "utils/promise";
import { Hex, isAddressEqual, zeroAddress } from "viem";

const MAX_SIZE = 1232;

export const getCollectionName = async (collection_address: Hex) => {
  const req = await readContract({
    abi: ERC721,
    address: collection_address,
    functionName: "name",
  });
  return req as string;
};

export const getTokenURI = async (tokenId: any, collection_address: Hex) => {
  const req = await readContract({
    abi: ERC721,
    functionName: "tokenURI",
    args: [tokenId],
    address: collection_address,
  });

  return req;
};

export const getOwnerNFTCollection = async (
  collection_address: Hex,
  wallet_address: Hex,
) => {
  const listNFTIds: any[] = [];
  const collectionName = await getCollectionName(collection_address);
  const walletOfOwner: any = await readContract({
    abi: ERC721,
    address: collection_address,
    functionName: "walletOfOwner",
    args: [wallet_address],
  });

  if (walletOfOwner?.length > 0) {
    const nftURIs = walletOfOwner.map(async (element: any) => {
      const res = await getTokenURI(element, collection_address);
      const req = await fetch(res as string, {
        cache: "force-cache",
        next: {
          revalidate: 1800,
        },
      });
      const data = await req.json();
      return { ...data.NFT };
    });

    const res = await Promise.all(nftURIs);
    return {
      collectionName,
      listNFTIds: res,
    };
  }

  return {
    collectionName,
    listNFTIds,
  };
};

export const getWalletNFTs = async (params: {
  wallet_address: Hex;
  collection_address: Hex;
}): Promise<NFTMetada[]> => {
  const { wallet_address, collection_address } = params;
  if (!wallet_address) return [];
  const req = await fetch(
    `/api/nft/list-nft?wallet_address=${wallet_address}&collection_address=${collection_address}`,
  );
  const data = await req.json();
  return data?.allNFTsMetadata || [];
};

export const getApproveNFT = async (
  nft_id: number,
  collection_address: Hex,
  contract_interaction_address: Hex,
) => {
  const address = (await readContract({
    address: collection_address,
    abi: ERC721,
    functionName: "getApproved",
    args: [nft_id],
  })) as unknown as Hex;

  if (
    !isAddressEqual(address, zeroAddress) &&
    isAddressEqual(address, contract_interaction_address)
  ) {
    return true;
  }

  return false;
};

export const approveNFT = async (
  collection_address: Hex,
  target_address: Hex,
  nft_id: number,
) => {
  const config = await prepareWriteContract({
    address: collection_address,
    abi: erc721ABI,
    functionName: "approve",
    args: [target_address, BigInt(nft_id)],
  });
  const req = await writeContract(config);
  try {
    await waitForTransaction({ hash: req.hash });
  } catch (error) {}
  return req;
};

export const depositNFT = async ({
  nft_id,
  contract_interaction_address,
  collection_address,
}: {
  nft_id: number;
  contract_interaction_address?: Hex;
  collection_address?: Hex;
}) => {
  if (!contract_interaction_address || !collection_address) {
    return;
  }
  const config = await prepareWriteContract({
    address: contract_interaction_address,
    abi: CIABI,
    functionName: "addToProfile",
    args: [collection_address, BigInt(nft_id)],
  });
  const req = await writeContract(config);
  try {
    await waitForTransaction({ hash: req.hash });
  } catch (error) {}

  return req;
};

type DepositProps = {
  id: number;
  collectionName: string;
  wallet_address: Hex;
  chainId: number;
  hash: Hex;
};

type TransferInventoryProps = {
  chain: string;
  collectionName: string;
  from_address: string;
  tx_hash: Hex;
  to_address: string;
  token_addresses: string[];
};

export const compareDepositWithBackend = async (params: DepositProps) => {
  const { chainId, collectionName, wallet_address, id, hash } = params;

  await sleep(3000);
  const req = await fetch(`/api/nft/deposit`, {
    method: "POST",
    body: JSON.stringify({
      wallet_address,
      token_id: id,
      tx_hash: hash,
      chain: CHAIN_SYMBOL[chainId],
      collection: collectionName,
    }),
  });
  return { ...req };
};

export const transferInventoryWithBackend = async (
  params: TransferInventoryProps,
) => {
  const {
    chain,
    collectionName,
    from_address,
    tx_hash,
    to_address,
    token_addresses,
  } = params;

  await sleep(3000);
  const req = await fetch(`/api/nft/transfer-inventory`, {
    method: "POST",
    body: JSON.stringify({
      from_address,
      tx_hash,
      to_address,
      token_addresses,
      chain,
      collection: collectionName,
    }),
  });
  return { ...req };
};

export const getFeeWithdraw = async (contract_interaction_address: Hex) => {
  const res = await readContract({
    address: contract_interaction_address,
    abi: CIABI,
    functionName: "amountETH",
  });
  return res as bigint;
};

export const withdrawNFT = async (address: Hex, nft_id: number) => {
  const fee = await getFeeWithdraw(address);
  const config = await prepareWriteContract({
    address,
    abi: CIABI,
    functionName: "withdrawNFT",
    args: [nft_id],
    value: BigInt(fee),
  });

  const req = await writeContract(config);

  return req.hash;
};

type AddSolanaNFTToProfileProps = {
  sendTransaction: WalletAdapterProps["sendTransaction"];
  connection: Connection;
  address: PublicKey;
  contract_address: PublicKey;
};

export const addSolanaNFTToProfile = async ({
  sendTransaction,
  connection,
  address,
  contract_address,
}: AddSolanaNFTToProfileProps) => {
  const source_account = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    contract_address,
    address,
  );
  const destination_account = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    contract_address,
    new PublicKey(ADDRESS_WALLET_NFT),
  );

  let tx = new Transaction();

  const account = await connection.getAccountInfo(destination_account);
  if (account == null) {
    const createIx = Token.createAssociatedTokenAccountInstruction(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      contract_address,
      destination_account,
      new PublicKey(ADDRESS_WALLET_NFT),
      address,
    );

    tx.add(createIx);
  }

  tx.add(
    Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      source_account,
      destination_account,
      address,
      [],
      1,
    ),
  );
  const signature = await sendTransaction(tx, connection);
  console.log("signature: successfully: ", signature);
  await connection.confirmTransaction(signature, "finalized");
  await sleep(2000);
  return signature;
};

type AddManySolanaNFTsToProfileProps = {
  sendTransaction: WalletAdapterProps["sendTransaction"];
  signAllTransactions:
    | SignerWalletAdapterProps["signAllTransactions"]
    | undefined;
  connection: Connection;
  address: PublicKey;
  nfts: string[];
};

export const addManySolanaNFTsToProfile = async ({
  signAllTransactions,
  connection,
  address,
  nfts,
}: AddManySolanaNFTsToProfileProps) => {
  if (!signAllTransactions) throw Error("Please, use supported version!");
  const txs: Transaction[] = [];
  let tx = new Transaction();
  let index = 0;
  console.log("addManySolanaNFTsToProfile:nfts: ", nfts);
  for (const nft of nfts) {
    index++;
    const source_account = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      new PublicKey(nft),
      address,
    );
    const destination_account = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      new PublicKey(nft),
      new PublicKey(ADDRESS_WALLET_NFT),
    );

    const account = await connection.getAccountInfo(destination_account);
    let createIx: TransactionInstruction | null = null;
    if (account == null) {
      createIx = Token.createAssociatedTokenAccountInstruction(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        new PublicKey(nft),
        destination_account,
        new PublicKey(ADDRESS_WALLET_NFT),
        address,
      );

      tx.add(createIx);
    }

    const transferIx = Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      source_account,
      destination_account,
      address,
      [],
      1,
    );

    tx.add(transferIx);

    // check size
    if (index >= MAX_TRANSFERABLE_NFT) {
      const recentHash = await connection.getLatestBlockhash();
      tx.recentBlockhash = recentHash.blockhash;
      tx.feePayer = address;
      txs.push(tx);
      tx = new Transaction();
      index = 0;
      continue;
    }
  }
  const recentHash = await connection.getLatestBlockhash();
  tx.recentBlockhash = recentHash.blockhash;
  tx.feePayer = address;
  txs.push(tx);
  const signedTxs = await signAllTransactions(txs);

  const signatures = await Promise.all(
    signedTxs.map(async (trx) => {
      return await connection.sendRawTransaction(trx.serialize());
    }),
  );

  console.log("signature: successfully: ", signatures);
  await Promise.all(
    signatures.map(async (signature) => {
      return await connection.confirmTransaction(signature, "finalized");
    }),
  );
  await sleep(2000);
  return signatures;
};

// COMPACT ARRAY

const LOW_VALUE = 127; // 0x7f
const HIGH_VALUE = 16383; // 0x3fff

/**
 * Compact u16 array header size
 * @param n elements in the compact array
 * @returns size in bytes of array header
 */
const compactHeader = (n: number) =>
  n <= LOW_VALUE ? 1 : n <= HIGH_VALUE ? 2 : 3;

/**
 * Compact u16 array size
 * @param n elements in the compact array
 * @param size bytes per each element
 * @returns size in bytes of array
 */
const compactArraySize = (n: number, size: number) =>
  compactHeader(n) + n * size;

/**
 * @param tx a solana transaction
 * @param feePayer the publicKey of the signer
 * @returns size in bytes of the transaction
 */
const getTxSize = (tx: Transaction, feePayer: PublicKey): number => {
  const feePayerPk = [feePayer.toBase58()];

  const signers = new Set<string>(feePayerPk);
  const accounts = new Set<string>(feePayerPk);

  const ixsSize = tx.instructions.reduce((acc, ix) => {
    ix.keys.forEach(({ pubkey, isSigner }) => {
      const pk = pubkey.toBase58();
      if (isSigner) signers.add(pk);
      accounts.add(pk);
    });

    accounts.add(ix.programId.toBase58());

    const nIndexes = ix.keys.length;
    const opaqueData = ix.data.length;

    return (
      acc +
      1 + // PID index
      compactArraySize(nIndexes, 1) +
      compactArraySize(opaqueData, 1)
    );
  }, 0);

  return (
    compactArraySize(signers.size, 64) + // signatures
    3 + // header
    compactArraySize(accounts.size, 32) + // accounts
    32 + // blockhash
    compactHeader(tx.instructions.length) + // instructions
    ixsSize
  );
};
