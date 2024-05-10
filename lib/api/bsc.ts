import { Hex } from "viem";

import {
  prepareWriteContract,
  readContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import {
  INVENTORY_BSC_TICKET_IDENTITY_PASS,
  INVENTORY_TICKET_ABI,
  MINT_BSC_TICKET_IDENTITY_PASS,
  MINT_TICKET_ABI,
  priceBNBFunctionName,
  targetChainMint,
} from "constants/bscNFTTicket/mint";
import { MINT_NFT_CHAIN_NAME } from "constants/global";
import { holesky } from "viem/chains";

const targetChain = holesky;

export const nftContractConfig: any = {
  abi: MINT_TICKET_ABI,
  address: MINT_BSC_TICKET_IDENTITY_PASS,
};

export const inventoryContractConfig: any = {
  abi: INVENTORY_TICKET_ABI,
  address: INVENTORY_BSC_TICKET_IDENTITY_PASS,
};

export const pricePerBNB = async () => {
  const pricePerBNB = await readContract({
    ...nftContractConfig,
    functionName: priceBNBFunctionName,
    chainId: targetChainMint,
  });
  console.log("pricePerBNB", priceBNBFunctionName);
  return Number(BigInt(pricePerBNB as bigint).toString()) / 10 ** 18;
};

export const getBalanceNFTs = async (w: Hex) => {
  const data = await readContract({
    ...nftContractConfig,
    functionName: "balanceOf",
    chainId: targetChainMint,
    args: [w],
  });

  return Number(BigInt(data as bigint).toString());
};

export const totalSupply = async () => {
  const totalSupply = await readContract({
    ...nftContractConfig,
    functionName: "totalSupply",
    chainId: targetChainMint,
  });

  return Number(BigInt(totalSupply as bigint).toString());
};

export const amountNftTotal = async () => {
  const amountNftTotal = await readContract({
    ...nftContractConfig,
    functionName: "amountNftTotal",
    chainId: targetChainMint,
  });

  return Number(BigInt(amountNftTotal as bigint).toString());
};

export const supplyLeft = async () => {
  const totalSupplyNum = await totalSupply();
  const amountNftTotalNum = await amountNftTotal();

  return amountNftTotalNum - totalSupplyNum;
};

export const getNFTBalance = async (accountAddress: Hex) => {
  try {
    const data = await readContract({
      ...nftContractConfig,
      functionName: "balanceOf",
      chainId: targetChainMint,
      args: [accountAddress],
    });
    if (typeof data === "bigint")
      return parseInt(BigInt(data as bigint).toString());

    return 0;
  } catch (error) {
    return 0;
  }
};

export const getBurnedNFTs = async (accountAddress: Hex) => {
  try {
    const data = await readContract({
      ...inventoryContractConfig,
      functionName: "checkInfo",
      chainId: targetChainMint,
      args: [accountAddress],
    });

    return Array.isArray(data) ? data.length : 0;
  } catch (error) {
    return 0;
  }
};

export const getMintedNFTs = async (accountAddress: Hex) => {
  try {
    const balanceNFTs = await getBalanceNFTs(accountAddress);
    const burnedNFTs = await getBurnedNFTs(accountAddress);
    return {
      minted: balanceNFTs + burnedNFTs,
      burned: burnedNFTs,
      balance: balanceNFTs,
    };
  } catch (error) {
    return {
      minted: 0,
      burned: 0,
      balance: 0,
    };
  }
};

export const getTokenIDOwner = async (accountAddress?: Hex) => {
  if (!accountAddress) return 0;
  try {
    const data = await readContract({
      ...inventoryContractConfig,
      functionName: "tokenIDOwner",
      chainId: targetChainMint,
      args: [accountAddress, 0],
    });
    if (typeof data === "bigint") {
      console.log("data", parseInt(BigInt(data as bigint).toString()));
      return parseInt(BigInt(data as bigint).toString());
    }

    return 0;
  } catch (error) {
    console.log("error", error);

    return 0;
  }
};

export const mintNFT = async (p: { amountNFT: number; mint: number }) => {
  const config = await prepareWriteContract({
    abi: MINT_TICKET_ABI,
    address: MINT_BSC_TICKET_IDENTITY_PASS,
    functionName: "mint",
    args: [p.amountNFT],
    value: BigInt(p.mint),
  });
  const txHash = await writeContract(config);

  return txHash;
};

export const getTokenIdByIndex = async (p: { owner: Hex; index: number }) => {
  const tokenId = await readContract({
    ...inventoryContractConfig,
    functionName: "tokenOfOwnerByIndex",
    chainId: targetChainMint,
    args: [p.owner, p.index],
  });

  return Number(BigInt(tokenId as bigint).toString());
};

export const checkIsApprovedForAllNFTs = async (p: { owner: Hex }) => {
  const isApprovedForAll = await readContract({
    ...nftContractConfig,
    functionName: "isApprovedForAll",
    chainId: targetChainMint,
    args: [p.owner, INVENTORY_BSC_TICKET_IDENTITY_PASS],
  });

  return Boolean(isApprovedForAll);
};

export const setApproveForAllNFTs = async () => {
  const config = await prepareWriteContract({
    abi: MINT_TICKET_ABI,
    address: MINT_BSC_TICKET_IDENTITY_PASS,
    functionName: "setApprovalForAll",
    args: [INVENTORY_BSC_TICKET_IDENTITY_PASS, true],
  });

  const txHash = await writeContract(config);

  await waitForTransaction({
    hash: txHash.hash,
  });

  return txHash;
};

export const issueTicket = async (p: { tx_hash: string; chain: string }) => {
  try {
    const req = await fetch("/api/user/get-issued-code", {
      method: "POST",
      body: JSON.stringify(p),
    });
    if (req.ok && req.status === 200) {
      return req.json();
    } else {
      throw req;
    }
  } catch (error) {
    return error;
  }
};

export const inputReferralCode = async (p: {
  referral_code: string;
  tx_hash: string;
  chain: string;
}) => {
  try {
    const req = await fetch("/api/user/input-referral-code", {
      method: "POST",
      body: JSON.stringify(p),
    });
    if (req.ok && req.status === 200) {
      return req.json();
    } else {
      throw req;
    }
  } catch (error) {
    return error;
  }
};

export const addToInventory = async () => {
  const config = await prepareWriteContract({
    abi: INVENTORY_TICKET_ABI,
    address: INVENTORY_BSC_TICKET_IDENTITY_PASS,
    functionName: "addNFT",
  });

  const txHash = await writeContract(config);
  try {
    await waitForTransaction({
      hash: txHash.hash,
    });
  } catch (error) {
    console.log(error);
  }

  await issueTicket({
    tx_hash: txHash.hash,
    chain: MINT_NFT_CHAIN_NAME,
  });
  return txHash;
};
