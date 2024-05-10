import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import MintABI from "constants/MINT_ABI.json";
import { Hex, parseEther } from "viem";

export const mintETHWl = async ({
  amount,
  price,
  contract_address,
  isWhitelisted,
}: {
  amount: number;
  price: number;
  contract_address: Hex;
  isWhitelisted: boolean;
}) => {
  const config = await prepareWriteContract({
    abi: MintABI,
    address: contract_address,
    functionName: isWhitelisted ? "mintETHWl" : "mintETHNonWl",
    args: [amount],
    value: parseEther(price.toString(), "wei"),
  });
  const reqWrite = await writeContract(config);
  try {
    await waitForTransaction({ hash: reqWrite.hash });
  } catch (error) {}
  return reqWrite.hash;
};
