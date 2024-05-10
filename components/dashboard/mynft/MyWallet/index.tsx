import { Hex } from "viem";
import { useAccount, useNetwork } from "wagmi";

import WalletIcon from "@/components/shared/icons/wallet-icon";

import useContracts from "@/lib/hooks/useContracts";
import { Key } from "react";
import { shortAddress } from "utils/string";
import CryptoWallet from "../CryptoWallet";
import NFTCollection from "./NFTCollection";

export default function MyWallet() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { NFT_COLLECTIONS_CONTRACT } = useContracts({
    chainId: chain?.id,
  });

  return (
    <div className="pb-20 pt-10 font-aeonikPro text-white">
      <div className="flex h-fit items-center gap-x-4">
        <div className="relative flex h-[52px] w-[52px] flex-col items-center justify-center rounded-[62px] bg-[#16372F]">
          <WalletIcon className="h-[30px] w-[30px]" />
        </div>
        <div>
          <h1 className="text-[28px] font-medium">My Wallet</h1>
          <p>{shortAddress(address, 10)}</p>
        </div>
      </div>
      <CryptoWallet />
      {(NFT_COLLECTIONS_CONTRACT || []).map(
        (collection: Key | null | undefined) => (
          <NFTCollection
            collection_address={collection as Hex}
            chainId={chain?.id as number}
            wallet_address={address as Hex}
            key={collection}
          />
        ),
      )}
    </div>
  );
}
