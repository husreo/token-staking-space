import Button from "@/components/shared/button";
import CheckIcon from "@/components/shared/icons/check-icon";
import ClockIcon from "@/components/shared/icons/clock";
import PowerIcon from "@/components/shared/icons/power";
import SpinnerIcon from "@/components/shared/icons/spinner";
import { useWallet } from "@solana/wallet-adapter-react";
import { PhantomWalletName } from "@solana/wallet-adapter-wallets";
import { PublicKey } from "@solana/web3.js";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setWalletType } from "store/features/wallet/walletSlice";
import { shortAddress } from "utils/string";
import Translation from "utils/translation";
import { WhiteListMissionWrapper } from "./common";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false },
);

const ConnectWalletMission = ({
  runAddWhitelist,
  loading,
  connected_wallet,
}: {
  loading: boolean;
  connected_wallet?: string;
  runAddWhitelist: (add: string) => void;
}) => {
  const dispatch = useDispatch();
  const [hashPhantom, setHasPhantom] = useState(false);
  const { session } = useSelector((state: RootState) => state.user);
  const isLoggedIn = !!session?.access_token;
  const t = useTranslations();
  const translate = (text: string) => t(`aviatrix.${text}`);

  const { disconnect, select } = useWallet();
  const [walletPublicKey, setWalletPublicKey] = useState<PublicKey | null>();
  select(PhantomWalletName);

  return (
    <>
      {/* <ModalWrapper
        open={selectWallet}
        onClose={() => {
          toggleSelectWallet();
        }}
      >
        <ConnectWalletModal onSelectChain={() => toggleSelectWallet()} />
      </ModalWrapper> */}
      {!!connected_wallet ? (
        <WhiteListMissionWrapper
          isLoggedIn={isLoggedIn}
          isSetup={!!connected_wallet}
          className="flex min-h-[200px] flex-col justify-between"
        >
          <div className="relative flex flex-col gap-3">
            <div className="mx-auto flex h-fit items-center gap-1 rounded-[22px] bg-white/[0.13] px-[6px] py-1">
              <CheckIcon className="w-4 text-fcon" />

              <p className="font-aeonikMono text-[13px] capitalize">
                {translate("done")}
              </p>
            </div>{" "}
            <p className="text-center text-[13px]">
              {translate("done-connect-wallet")}
            </p>
          </div>
          <button className="z-10 flex h-12 w-full items-center justify-center rounded-[10px] border border-white/[0.11] text-[15px] font-medium">
            {shortAddress(connected_wallet, 10)}
          </button>
        </WhiteListMissionWrapper>
      ) : (
        <WhiteListMissionWrapper
          isLoggedIn={isLoggedIn}
          isSetup={!!connected_wallet}
          className="flex h-[200px] flex-col justify-between"
        >
          <div className="relative flex flex-col gap-3">
            <div className="mx-auto flex h-fit items-center gap-1 rounded-[22px] bg-white/[0.13] px-[6px] py-1">
              {connected_wallet ? (
                <CheckIcon className="w-4 text-fcon" />
              ) : (
                <ClockIcon className="w-4" strokeColor="#ffd774" />
              )}

              <span
                suppressHydrationWarning
                className="font-aeonikMono text-[13px]"
              >
                {!walletPublicKey?.toBase58()
                  ? translate("disconnected")
                  : connected_wallet
                  ? translate("done")
                  : translate("pending")}
              </span>
            </div>
            {!!walletPublicKey?.toBase58() ? (
              !!session?.user?.username && (
                <button
                  onClick={() => {
                    if (walletPublicKey?.toBase58()) {
                      runAddWhitelist(walletPublicKey.toBase58());
                    }
                  }}
                  disabled={loading}
                  className="mx-auto w-fit border-b border-white/80"
                >
                  {loading ? (
                    <SpinnerIcon className="h-5 w-5" />
                  ) : (
                    translate("add-wallet")
                  )}
                </button>
              )
            ) : (
              <p className="text-center leading-7">
                {translate("btn-connect-wallet")}
              </p>
            )}
          </div>
          {!!walletPublicKey?.toBase58() ? (
            <div className="relative flex items-center gap-4">
              <div className="z-10 flex h-12 flex-1 items-center justify-center rounded-[10px] border border-white/[0.11] text-[15px] font-medium">
                {/* {connector?.id === "metaMask" && (
                  <Image
                    src={MetaMask}
                    className="w-6"
                    alt="metamask"
                    sizes="(max-width: 600px) 100vw, 100vw"
                  />
                )} */}
                {/* {connector?.id === "coinbaseWallet" && (
                  <Coinbase className="w-7" />
                )} */}
                <p>{shortAddress(walletPublicKey?.toBase58(), 8)}</p>
              </div>
              <button className="cursor-pointer" onClick={() => disconnect()}>
                <PowerIcon className="w-5" />
              </button>
            </div>
          ) : hashPhantom ? (
            <Button
              className="mx-auto h-12 min-w-[300px] rounded-[100px] px-3 py-1 text-black"
              variant="gradient"
              onClick={() => dispatch(setWalletType("solana"))}
            >
              <Translation text="button.connect-wallet" />
            </Button>
          ) : (
            <a
              // href={`https://phantom.app/ul/browse/${encodeURI(
              //   window?.location.href,
              // )}?ref=${encodeURI(window?.location.origin)}`}
              target="_blank"
              className="z-10 flex h-12 w-full items-center justify-center rounded-[10px] border border-white/[0.11] text-[15px] font-medium"
            >
              {translate("btn-connect-wallet")}
            </a>
          )}
        </WhiteListMissionWrapper>
      )}
    </>
  );
};

export default ConnectWalletMission;
