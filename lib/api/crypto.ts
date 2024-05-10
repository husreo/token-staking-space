import {
  PythCluster,
  PythHttpClient,
  getPythProgramKeyForCluster,
} from "@pythnetwork/client";
import { EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";
import { WalletAdapterProps } from "@solana/wallet-adapter-base";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  erc20ABI,
  fetchBalance,
  fetchToken,
  prepareWriteContract,
  readContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import BUY_FP_ABI from "constants/BUY_FP_ABI.json";
import USDT_ABI from "constants/USDT_MAINET_ABI.json";
import {
  ALLOW_CHAIN_ID,
  CHAIN_TOKEN,
  SOLANA_ALLOW_CHAIN_ID,
} from "types/token";
import { Hex, maxUint256 } from "viem";
// import { Federant } from "next/font/google";
import { ADDRESS_DEPOSIT_FCON, ADMIN_ADDRESS } from "constants/payment";
import { sleep } from "utils/promise";

const PYTHNET_CLUSTER_NAME: PythCluster =
  process.env.NEXT_PUBLIC === "mainet" ? "mainnet-beta" : "devnet";

export const getPriceFeed = async (chainid: string, isTestnet?: boolean) => {
  const connection = new EvmPriceServiceConnection(
    isTestnet
      ? "https://xc-testnet.pyth.network"
      : "https://xc-mainnet.pyth.network",
  );
  const priceIds = [
    // You can find the ids of prices at https://pyth.network/developers/price-feed-ids#pyth-evm-testnet
    chainid,
  ];
  const req = await connection.getLatestPriceFeeds(priceIds);
  const priceFeed = req?.[0].getEmaPriceNoOlderThan(60);
  console.log("evm price feed: ", priceFeed);
  return priceFeed;
};

export const getSolanaPriceFeed = async (feed: string, conn: Connection) => {
  const connection = new Connection(conn.rpcEndpoint);
  const pythPublicKey = getPythProgramKeyForCluster(PYTHNET_CLUSTER_NAME);
  const pythClient = new PythHttpClient(connection, pythPublicKey);

  const data = await pythClient.getAssetPricesFromAccounts([
    new PublicKey(feed),
  ]);
  return data[0].price;
};

export interface SimplePriceResponse {
  [coin: string]: {
    /**
     * price of coin for this currency
     */
    usd: number;
  };
}

export const getCoingeckoPrice = async (
  _feed?: string,
): Promise<number | null> => {
  try {
    const res = await fetch(`/api/token/fcon-price`, {
      next: {
        revalidate: 10,
      },
    });
    const response = await res.json();

    if (response.price) {
      return response.price;
    } else {
      throw new Error("Token price not available");
    }
  } catch (error) {
    console.error("Error fetching token price:", error);
    return null;
  }
};

export const getTokenPrice = async (symbol: string) => {
  try {
    const res = await fetch(`/api/token/get-price?symbol=${symbol}`, {
      method: "GET",
      next: {
        revalidate: 10,
      },
    });
    const response = await res.json();

    if (response.price) {
      return response.price;
    } else {
      throw new Error("Token price not available");
    }
  } catch (error) {
    console.error("Error fetching token price:", error);
    return null;
  }
};

type PaymentProps = {
  targetChain?: ALLOW_CHAIN_ID;
  isNative?: boolean;
  address: Hex;
  packValue: number;
  rate: number;
  selectedToken?: CHAIN_TOKEN;
  buyContract?: Hex;
};

export const handlePayment = async ({
  targetChain,
  isNative,
  address,
  packValue,
  rate,
  selectedToken,
  buyContract,
}: PaymentProps) => {
  if (!targetChain || !buyContract) return;
  let txHash;
  let rawValue;
  if (isNative) {
    const tokenBalaceReq = await fetchBalance({
      address,
    });
    const balance = Number(tokenBalaceReq.formatted);
    if (balance < packValue / rate) {
      throw new Error("Exceed Balance");
    }
    rawValue = Math.round((packValue / rate) * 10 ** 18);

    const config = await prepareWriteContract({
      address: buyContract,
      abi: BUY_FP_ABI,
      functionName: "buyNative",
      value: BigInt(rawValue),
    });
    const req = await writeContract(config);

    txHash = req.hash;
  } else if (selectedToken) {
    const tokenBalaceReq = await fetchBalance({
      address: address as Hex,
      token: selectedToken.address as Hex,
    });

    const balance = Number(tokenBalaceReq.formatted);
    if (balance < packValue / rate) {
      throw new Error("Exceed Balance");
    }
    rawValue = Math.round((packValue / rate) * 10 ** selectedToken?.decimal);
    const config = await prepareWriteContract({
      address: buyContract,
      abi: BUY_FP_ABI,
      functionName: "buyToken",

      args: [selectedToken.address, BigInt(rawValue)],
    });
    const transactionResult = await writeContract(config);
    txHash = transactionResult.hash;
  }

  return {
    txHash,
    value: rawValue as number,
    packValue,
  };
};

type SolanaPaymentProps = {
  sendTransaction: WalletAdapterProps["sendTransaction"];
  connection: Connection;
  targetChain?: SOLANA_ALLOW_CHAIN_ID;
  isNative?: boolean;
  address: PublicKey;
  packValue: number;
  rate: number;
  selectedToken?: CHAIN_TOKEN;
};

export const handlePaymentSolana = async ({
  sendTransaction,
  connection,
  isNative,
  address,
  packValue,
  rate,
  selectedToken,
}: SolanaPaymentProps) => {
  let rawValue;
  let Tx = new Transaction();

  console.log("startPayment: ", isNative);
  if (isNative) {
    const tokenBalaceReq = await connection.getBalance(address);
    const decimalizedPackValue = packValue * 10 ** 9;
    if (tokenBalaceReq * rate < decimalizedPackValue)
      throw new Error("Exceed Balance");

    rawValue = Math.round((packValue / rate) * 10 ** 9);
    console.log(rawValue);
    Tx.add(
      SystemProgram.transfer({
        fromPubkey: address,
        // TODO: Replace it for real admin
        toPubkey: new PublicKey(ADMIN_ADDRESS),
        lamports: rawValue,
      }),
    );
  } else if (selectedToken) {
    const source_account = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      new PublicKey(selectedToken.address),
      address,
    );

    console.log(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      new PublicKey(selectedToken.address).toBase58(),
      address,
    );
    const tokenBalaceReq = await connection.getTokenAccountBalance(
      source_account,
    );

    const decimalizedPackValue =
      packValue * 10 ** tokenBalaceReq.value.decimals;
    console.log("decimalizedPackValue: ", decimalizedPackValue);
    if (
      !tokenBalaceReq.value.amount ||
      Number(tokenBalaceReq.value.amount) * rate < decimalizedPackValue
    )
      throw new Error("Exceed Balance");

    const mint = new PublicKey(selectedToken.address);
    const destination_account = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      mint,
      new PublicKey(ADMIN_ADDRESS),
    );
    const account = await connection.getAccountInfo(destination_account);
    if (account == null) {
      const createIx = Token.createAssociatedTokenAccountInstruction(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        mint,
        destination_account,
        new PublicKey(ADMIN_ADDRESS),
        address,
      );

      Tx.add(createIx);
    }

    rawValue = Math.round((packValue / rate) * 10 ** selectedToken?.decimal);

    const transferIx = Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      source_account,
      destination_account,
      address,
      [],
      rawValue,
    );
    Tx.add(transferIx);
  }

  const signature = await sendTransaction(Tx, connection);
  console.log("signature: successfully: ", signature);
  await connection.confirmTransaction(signature, "finalized");
  await sleep(2000);
  return {
    txHash: signature,
    value: rawValue,
    packValue,
  };
};

export type TransferSolanaTokenProps = {
  sendTransaction: WalletAdapterProps["sendTransaction"];
  connection: Connection;
  isNative?: boolean;
  address: PublicKey;
  amount: number;
  selectedToken?: CHAIN_TOKEN;
  receiveAddress?: PublicKey;
};

export const transferSolanaToken = async ({
  sendTransaction,
  connection,
  isNative,
  address,
  amount,
  selectedToken,
  receiveAddress,
}: TransferSolanaTokenProps) => {
  let rawValue;
  let Tx = new Transaction();

  if (isNative) {
    const tokenBalaceReq = await connection.getBalance(address);
    rawValue = Math.round(amount * 10 ** 9);
    if (tokenBalaceReq < rawValue) throw new Error("Exceed Balance");
    Tx.add(
      SystemProgram.transfer({
        fromPubkey: address,
        // TODO: Replace it for real admin
        toPubkey: new PublicKey(receiveAddress || ADDRESS_DEPOSIT_FCON),
        lamports: rawValue,
      }),
    );
  } else if (selectedToken) {
    const source_account = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      new PublicKey(selectedToken.address),
      address,
    );
    let tokenBalaceReq;
    try {
      tokenBalaceReq = await connection.getTokenAccountBalance(source_account);
    } catch (e: any) {
      tokenBalaceReq = undefined;
    }
    rawValue = Math.round(amount * 10 ** selectedToken?.decimal);
    if (
      !tokenBalaceReq?.value.amount ||
      Number(tokenBalaceReq.value.amount) < rawValue
    )
      throw new Error("Exceed Balance");

    const mint = new PublicKey(selectedToken.address);
    const destination_account = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      mint,
      new PublicKey(receiveAddress || ADDRESS_DEPOSIT_FCON),
    );
    const account = await connection.getAccountInfo(destination_account);
    if (account == null) {
      const createIx = Token.createAssociatedTokenAccountInstruction(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        mint,
        destination_account,
        new PublicKey(receiveAddress || ADDRESS_DEPOSIT_FCON),
        address,
      );

      Tx.add(createIx);
    }
    const transferIx = Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      source_account,
      destination_account,
      address,
      [],
      rawValue,
    );
    Tx.add(transferIx);
  }

  const signature = await sendTransaction(Tx, connection);
  await connection.confirmTransaction(signature, "finalized");
  await sleep(2000);
  return {
    txHash: signature,
    value: rawValue,
    packValue: amount,
  };
};

export const submitTransaction = async (d: {
  value: number;
  txHash: Hex;
  connectedAddress: Hex;
  packValue: number;
  chain: string;
}) => {
  try {
    await waitForTransaction({
      hash: d.txHash,
      confirmations: 2,
    });
  } catch (error) {}
  await fetch(`/api/fp/deposit`, {
    body: JSON.stringify({
      wallet_address: d.connectedAddress,
      tx_hash: d.txHash,
      fp_amount: d.packValue,
      transfer_amount: d.value.toString(),
      chain: d.chain,
    }),
    method: "POST",
  });
  // dispatch(setUpdatedAt(Date.now()));
};

export const submitSolanaTransaction = async (d: {
  from_address: PublicKey;
  to_address: string;
  tx_hash: string;
  fp_amount: number;
  amount: string;
  chain: string;
  token: string;
  is_native: boolean;
  is_deposit_fcon?: boolean;
}) => {
  await fetch(`/api/fp/deposit-solana`, {
    body: JSON.stringify({
      from_address: d.from_address?.toBase58(),
      to_address: d.to_address,
      tx_hash: d.tx_hash,
      amount: d.amount,
      token: d.token,
      fp_amount: d.fp_amount,
      chain: d.chain,
      is_native: d.is_native,
      is_deposit_fcon: d.is_deposit_fcon,
    }),
    method: "POST",
  });
  // dispatch(setUpdatedAt(Date.now()));
};

export const getApproveBalance = async (opt: {
  token_address: Hex;
  owner_address: Hex;
  spender: Hex;
}) => {
  const allowance = await readContract({
    address: opt.token_address,
    abi: erc20ABI,
    functionName: "allowance",
    args: [opt.owner_address, opt.spender],
  });
  const token = await fetchToken({
    address: opt.token_address,
  });

  return Number(allowance.toString()) * 10 ** -token.decimals;
};

export const approveBalance = async (opt: {
  spender: Hex;
  token_address: Hex;
  value: number;
  maxApprove?: boolean;
  isMainet?: boolean;
  isUSDT?: boolean;
}) => {
  const config = await prepareWriteContract({
    address: opt.token_address,
    abi: opt.isMainet && opt.isUSDT ? (USDT_ABI as any) : erc20ABI,
    functionName: "approve",
    args: [opt.spender, opt?.maxApprove ? maxUint256 : BigInt(opt.value)],
  });

  const req = await writeContract(config);

  return req.hash;
};

export const sendCrypto = async (opts: {
  receive_address: Hex;
  token_address: Hex;
  value: number;
  wallet_address?: Hex;
  isUSDT?: boolean;
  isMainet?: boolean;
}) => {
  const {
    value,
    token_address,
    receive_address,
    wallet_address,
    isMainet,
    isUSDT,
  } = opts;
  if (!wallet_address) return;

  const token = await fetchToken({
    address: token_address,
  });
  const balanceToken = await fetchBalance({
    token: token_address,
    address: wallet_address,
  });
  if (Number(balanceToken.formatted) < value) {
    throw new Error("Exceed Balance");
  }
  let hash;
  const config = await prepareWriteContract({
    abi: isUSDT && isMainet ? (USDT_ABI as any) : erc20ABI,
    functionName: "transfer",
    args: [receive_address, BigInt(Math.round(value * 10 ** token.decimals))],
    address: token_address,
  });

  hash = await writeContract(config);

  return {
    tx_hash: hash.hash,
    wallet_address: wallet_address,
    amount: value * 10 ** token.decimals,
  };
};
