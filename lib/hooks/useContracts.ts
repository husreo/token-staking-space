import {
  CHAIN_CONTRACTS,
  CONTRACTS,
  CONTRACTS_MAINNET,
  CONTRACTS_TESTNET,
} from "constants/payment";
import { useEffect, useState } from "react";
import { useSwitchNetwork } from "wagmi";

const listContracts: CHAIN_CONTRACTS =
  process.env.NEXT_PUBLIC_ENV === "testnet"
    ? CONTRACTS_TESTNET
    : CONTRACTS_MAINNET;

export default function useContracts({ chainId }: { chainId?: number }) {
  const [contracts, setContracts] = useState<CONTRACTS>();

  const { isLoading } = useSwitchNetwork();

  useEffect(() => {
    if (chainId && !!listContracts[chainId]) {
      setContracts(listContracts[chainId]);
    }
    return () => {
      setContracts({});
    };
  }, [chainId, isLoading]);

  return {
    ...contracts,
  };
}
