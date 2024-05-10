//@ts-ignore
import PowerIcon from "@/components/shared/icons/power";
import usePhantomWallet from "@/lib/hooks/usePhantomWallet";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { shortAddress } from "utils/string";
import HoldingNFTBenefits from "./HoldingNFTBenefits";
import InventoryNFT from "./InventoryNFT";
import SelectCollection from "./Management/SelectCollection";
import SelectInventory from "./Management/SelectInventory";
import NFTDisplay from "./NFTDisplay";

const NFTManagement = () => {
  const [nftStorage, setNFTStorage] = useState<"inventory" | "wallet">(
    "inventory",
  );
  const { walletPublicKey } = usePhantomWallet();
  const { disconnect } = useWallet();
  const t = useTranslations();
  const tranlate = (text: string) => t(`dashboard.profile.${text}`);

  return (
    <>
      <div className="mt-10 grid h-auto grid-cols-1 grid-rows-1 rounded-[10px] border border-white/[0.12] bg-gray1 md:min-h-[635px] md:grid-cols-12">
        <div className="col-span-1 flex flex-col justify-between gap-4 border-gray3 p-2 font-aeonikPro md:col-span-6 md:border-r lg:col-span-4">
          <div className="flex flex-1 flex-col justify-between px-5 pb-3 pt-5 text-white sm:px-10 sm:pb-8 sm:pt-10">
            <div>
              <p className="text-[28px] font-medium">
                {nftStorage === "inventory" ? "Inventory" : "My NFTs"}
              </p>
              <p className="mb-4 text-[12px] leading-[22px] opacity-80">
                {tranlate("NFT-vault")}
              </p>
              <div className="my-2 flex w-full">
                {/* <WalletMultiButtonCustom /> */}
                {nftStorage === "wallet" && walletPublicKey ? (
                  <div className="flex items-center gap-2">
                    {shortAddress(walletPublicKey.toBase58())}
                    <button onClick={disconnect}>
                      <PowerIcon className="w-4" />
                    </button>
                  </div>
                ) : null}
              </div>
              <SelectInventory
                setNFTStorage={setNFTStorage as any}
                value={nftStorage}
              />
              <SelectCollection />
            </div>
            <div className="mb-4 rounded-xl border border-white/[0.12] p-4 text-[13px] leading-5">
              {tranlate("description")}{" "}
              <span className="text-fcon">$FCON, Reward & Falcon Points.</span>
            </div>
          </div>
        </div>
        <div className="relative col-span-1 pb-10 font-aeonikPro text-white md:col-span-6 lg:col-span-8">
          {nftStorage === "inventory" ? (
            <div className="p-4">
              <HoldingNFTBenefits />
              <div className="overflow-y-scroll text-white md:max-h-[70vh]">
                <InventoryNFT />
              </div>
            </div>
          ) : (
            <NFTDisplay />
          )}
        </div>
      </div>
    </>
  );
};

export default NFTManagement;
