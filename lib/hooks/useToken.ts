import { mainnet, waitForTransaction } from "@wagmi/core";
import { useRequest } from "ahooks";
import { USDT_MAINET } from "constants/payment";
import { useCallback, useEffect, useState } from "react";
import { Hex } from "viem";
import { useAccount, useNetwork } from "wagmi";
import { approveBalance, getApproveBalance } from "../api/crypto";
import { toastError } from "../toastify";

const useUtilTokens = (opts: {
  token_address?: Hex;
  spender_address?: Hex;
  isNative?: boolean;
}) => {
  const { spender_address, token_address, isNative } = opts;
  const [allowance, setAllowance] = useState(0);
  const { address } = useAccount();
  const { chain } = useNetwork();

  const { run: runGetAllowance, loading: loadingAllowance } = useRequest(
    getApproveBalance,
    {
      manual: true,

      onSuccess: (d) => {
        setAllowance(d);
      },
    },
  );

  const handleApproveBalance = useCallback(
    async (parseValue: number) => {
      if (!address) return;
      if (spender_address && token_address) {
        const hash = await approveBalance({
          spender: spender_address,
          token_address: token_address,
          value: Math.round(parseValue),
          isMainet: chain?.id === mainnet.id,
          isUSDT: token_address === USDT_MAINET,
        });

        await waitForTransaction({ hash });
      }
    },
    [address, spender_address, token_address, chain?.id],
  );

  const { run: runApproveBalance, loading: loadingBalance } = useRequest(
    handleApproveBalance,
    {
      manual: true,
      onSuccess: () => {
        if (spender_address && token_address && address) {
          runGetAllowance({
            token_address,
            spender: spender_address,
            owner_address: address,
          });
        }
      },
      onError: (e: any) => {
        if (e?.cause?.details) {
          toastError(e?.cause?.details);
        } else if (e?.cause?.message) {
          toastError(e?.cause?.message);
        }
      },
    },
  );

  useEffect(() => {
    if (spender_address && token_address && address) {
      runGetAllowance({
        token_address,
        spender: spender_address,
        owner_address: address,
      });
    }
    return () => {
      setAllowance(0);
    };
  }, [spender_address, token_address, address, runGetAllowance]);
  return {
    allowance,
    loadingAllowance,
    loadingBalance,
    runApproveBalance,
  };
};

export default useUtilTokens;
