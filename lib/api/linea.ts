import {
  LINEA_INVENTORY_CONTRACT_ADDRESS,
  LINEA_NFT_CONTRACT_ADDRESS,
} from "constants/linea";
import { Hex, parseEther } from "viem";

import {
  prepareWriteContract,
  readContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import IDENTITY_PASS_ABI from "constants/IDENTITY_PASS_ABI.json";
import INVENTORY_NFT_IDENTITY_ABI from "constants/INVENTORY_NFT_IDENTITY_ABI.json";
import { linea } from "viem/chains";

export const nftContractConfig: any = {
  abi: IDENTITY_PASS_ABI,
  address: LINEA_NFT_CONTRACT_ADDRESS,
};

export const inventoryContractConfig: any = {
  abi: INVENTORY_NFT_IDENTITY_ABI,
  address: LINEA_INVENTORY_CONTRACT_ADDRESS,
};

export const pricePerETH = async () => {
  const pricePerETH = await readContract({
    ...nftContractConfig,
    functionName: "pricePerETH",
    chainId: linea.id,
  });

  return pricePerETH;
};

export const totalSupply = async () => {
  const totalSupply = await readContract({
    ...nftContractConfig,
    functionName: "totalSupply",
    chainId: linea.id,
  });

  return totalSupply as Number;
};

export const getBalanceOfNfts = async () => {
  try {
    const data = await readContract({
      ...nftContractConfig,
      functionName: "balanceOf",
      chainId: linea.id,
      args: [LINEA_INVENTORY_CONTRACT_ADDRESS],
    });
    if (typeof data === "bigint")
      return parseInt(BigInt(data as bigint).toString());

    return 0;
  } catch (error) {
    return 0;
  }
};

export const getNFTBalance = async (accountAddress: Hex) => {
  try {
    const data = await readContract({
      ...nftContractConfig,
      functionName: "balanceOf",
      chainId: linea.id,
      args: [accountAddress],
    });
    if (typeof data === "bigint")
      return parseInt(BigInt(data as bigint).toString());

    return 0;
  } catch (error) {
    return 0;
  }
};

export const getTokenIDOwner = async (accountAddress?: Hex) => {
  if (!accountAddress) return 0;
  try {
    const data = await readContract({
      ...inventoryContractConfig,
      functionName: "tokenIDOwner",
      chainId: linea.id,
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

export const mintNFTLinea = async ({
  mint,
  nftAmount,
  account_address,
}: {
  mint: number;
  nftAmount: number;
  account_address: any;
}) => {
  const { request } = await prepareWriteContract({
    address: LINEA_NFT_CONTRACT_ADDRESS,
    abi: IDENTITY_PASS_ABI,
    functionName: "mint",
    args: [nftAmount],
    value: parseEther(mint.toString(), "wei"),
    account: account_address,
  });
  const reqWrite = await writeContract(request);
  try {
    const transactionReceipt = await waitForTransaction({
      hash: reqWrite.hash,
    });
    return transactionReceipt?.transactionHash;
  } catch (error) {}
  return reqWrite;
};

export const isApprovedForAllLinea = async ({
  accountAddress,
}: {
  accountAddress: any;
}) => {
  const pricePerETH = await readContract({
    ...nftContractConfig,
    functionName: "isApprovedForAll",
    args: [accountAddress, LINEA_INVENTORY_CONTRACT_ADDRESS],
  });

  return pricePerETH;
};

export const setApprovalForAllLinea = async ({
  accountAddress,
}: {
  accountAddress: any;
}) => {
  const { request } = await prepareWriteContract({
    address: LINEA_NFT_CONTRACT_ADDRESS,
    abi: IDENTITY_PASS_ABI,
    functionName: "setApprovalForAll",
    args: [LINEA_INVENTORY_CONTRACT_ADDRESS, true],
    account: accountAddress,
  });
  const reqWrite = await writeContract(request);
  try {
    const transactionReceipt = await waitForTransaction({
      hash: reqWrite.hash,
    });
    return transactionReceipt?.transactionHash;
  } catch (error) {}
  return reqWrite;
};

export const addNFTToInventoryLinea = async ({
  accountAddress,
}: {
  accountAddress: any;
}) => {
  const { request } = await prepareWriteContract({
    address: LINEA_INVENTORY_CONTRACT_ADDRESS,
    abi: INVENTORY_NFT_IDENTITY_ABI,
    functionName: "addNFT",
    args: [LINEA_NFT_CONTRACT_ADDRESS],
    account: accountAddress,
  });
  const reqWrite = await writeContract(request);
  try {
    const transactionReceipt = await waitForTransaction({
      hash: reqWrite.hash,
    });
    return transactionReceipt?.transactionHash;
  } catch (error) {}
  return reqWrite;
};
