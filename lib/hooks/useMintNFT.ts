import { useRequest } from "ahooks";
import MintABI from "constants/MINT_ABI.json";
import { Abi, Hex, etherUnits } from "viem";
import { useBalance, useContractRead, useContractReads } from "wagmi";
import { mintETHWl } from "../api/mint";
import { toastSuccess } from "../toastify";

const useMintNFT = (opts: {
  address?: Hex;
  wallet_address?: Hex;
  chainId: number;
}) => {
  const { address, wallet_address, chainId } = opts;

  const { runAsync: runMintETHWl, loading: loadingMintNFT } = useRequest(
    mintETHWl,
    {
      manual: true,
      onFinally: () => {
        refetchMintStatus();
      },
      onSuccess: () => {
        toastSuccess("Mint NFT Successfully!");
      },
    },
  );

  const { data: etherBalance, refetch: refetchBalance } = useBalance({
    address: wallet_address,
    chainId,
    enabled: !!wallet_address,
  });

  useRequest(refetchBalance, {
    pollingInterval: 9000,
    ready: !!wallet_address,
  });

  const { data } = useContractRead({
    abi: MintABI,
    address,
    functionName: "wlPricePerETH",
    enabled: !!wallet_address,
    chainId,
  });

  const { data: isWhitelisted } = useContractRead({
    abi: MintABI,
    address,
    functionName: "whitelistAddress",
    args: [wallet_address],
    enabled: !!wallet_address,
    chainId,
  });

  //percentWL
  const { data: percentNonWL } = useContractRead({
    abi: MintABI,
    address,
    functionName: "percentNonWL",
    enabled: !!address,
    chainId,
  });

  const { data: dataMulticalls, refetch: refetchMintStatus } = useContractReads(
    {
      enabled: !!address,
      contracts: [
        //0
        {
          address,
          chainId,
          abi: MintABI as Abi,
          functionName: "amountNftTotal",
        },
        //1
        {
          address,
          chainId,
          abi: MintABI as Abi,
          functionName: "maxAmountNonWl",
        },
        //2
        {
          address,
          chainId,
          abi: MintABI as Abi,
          functionName: "maxAmountWl",
        },
        //3
        {
          address,
          chainId,
          abi: MintABI as Abi,
          functionName: "nftAmountNonWl",
        },
        //4
        {
          address,
          chainId,
          abi: MintABI as Abi,
          functionName: "nftAmountWl",
        },
        //5
        {
          address,
          chainId,
          abi: MintABI as Abi,
          functionName: "startTime",
        },
        //6
        {
          address,
          chainId,
          abi: MintABI as Abi,
          functionName: "endTime",
        },
      ],
      allowFailure: true,
    },
  );

  return {
    wlPricePerETH: data
      ? Number(BigInt(data as bigint).toString()) * 10 ** -etherUnits.wei
      : 0,
    isWhitelisted: isWhitelisted as boolean,
    percentNonWL: percentNonWL ? Number(BigInt(percentNonWL as bigint)) : 0,
    totalSupply: dataMulticalls?.[0].result
      ? Number(BigInt(dataMulticalls[0].result as bigint))
      : 0,
    maxAmountNonWl: dataMulticalls?.[1].result
      ? Number(BigInt(dataMulticalls[1].result as bigint))
      : 0,
    maxAmountWl: dataMulticalls?.[2].result
      ? Number(BigInt(dataMulticalls[2].result as bigint))
      : 0,
    nftAmountNonWl: dataMulticalls?.[3].result
      ? Number(BigInt(dataMulticalls[3].result as bigint))
      : 0,
    nftAmountWl: dataMulticalls?.[4].result
      ? Number(BigInt(dataMulticalls[4].result as bigint))
      : 0,
    startTime: dataMulticalls?.[4].result
      ? Number(BigInt(dataMulticalls[5].result as bigint))
      : 0,
    endTime: dataMulticalls?.[4].result
      ? Number(BigInt(dataMulticalls[6].result as bigint))
      : 0,
    refetchMintStatus,
    runMintETHWl,
    loadingMintNFT,
    walletBalance: etherBalance,
  };
};

export default useMintNFT;
