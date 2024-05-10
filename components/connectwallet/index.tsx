import { Disclosure } from "@headlessui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PhantomWalletName } from "@solana/wallet-adapter-wallets";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Coinbase from "public/images/wallets/coinbase.png";
import MetaMask from "public/images/wallets/metamask-colored.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setWalletType } from "store/features/wallet/walletSlice";
import { classNames } from "utils/string";
import { useConnect } from "wagmi";
import WalletMultiButtonCustom from "../dashboard/mynft/NFTManagement/WalletMultiButtonCustom";
import ModalWrapper from "../shared/ModalWrapper";
import ChevronDownIcon from "../shared/icons/chevron-down";
import WalletConnectIcon from "../shared/icons/wallets/WalletConnect";
import XIcon from "../shared/icons/x-icon";
import TopBackground from "./TopBackground";

const ModalConnectWallet = () => {
  const dispatch = useDispatch();
  const { connectors, connectAsync } = useConnect();
  const { walletType } = useSelector((state: RootState) => state.wallet);

  const [isAgree, setIsAgree] = useState(true);

  const toggleIsAgree = () => setIsAgree((prev) => !prev);
  const { select } = useWallet();
  const closeModal = () => dispatch(setWalletType());
  select(PhantomWalletName);

  return (
    <ModalWrapper
      open={!!walletType}
      onClose={() => {
        dispatch(setWalletType());
      }}
    >
      <div className="w-full px-3 sm:px-0">
      <div className="relative w-full sm:w-[520px] overflow-hidden rounded-[10px] bg-gray1 px-6 pb-12 pt-6 font-aeonikPro text-white">
        <div className="flex justify-end">
          <button
            onClick={() => dispatch(setWalletType())}
            className="relative z-10 flex items-center gap-2 rounded-[32px] bg-white/[0.12] px-3 py-[6px]"
          >
            <XIcon className="w-[10px]" />{" "}
            <span className="text-sm font-medium uppercase">cancel</span>
          </button>
        </div>
        <div className="pt-8">
          <p className="text-center text-2xl font-medium leading-7">
            Connect Wallet
          </p>
          <div className="relative z-10 mx-auto mt-4 max-w-[350px]">
            <p className="mb-10 text-center text-[13px] leading-[18px] text-white/80">
              By connecting a wallet, I agree to the{" "}
              <Link href="/terms-of-use" className="underline" target="_blank">
                Terms of Use
              </Link>
              , the use of third-party services, and the{" "}
              <Link
                href="/privacy-policy"
                target="_blank"
                className="underline"
              >
                Privacy Policy
              </Link>{" "}
              of Space Falcon LLC. 
              {/* I also consent to the specified fees for
              depositing and withdrawing tokens and NFTs. */}
            </p>
            {/* <div className="relative mb-8 mt-3 rounded-lg border border-white/[0.08] p-4">
              <Disclosure defaultOpen>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-2 py-2">
                        <p className="text-[13px] font-bold">Fees</p>
                        <p
                          style={{
                            background:
                              "linear-gradient(117deg, #C0F 0%, #BF6EFF 100%)",
                          }}
                          className="rounded-[2px] p-1 text-[11px] font-medium"
                        >
                          LIMITED TIME OFFER
                        </p>
                      </div>
                      <ChevronDownIcon
                        className={classNames(
                          "w-6 transform opacity-75 transition-all duration-100 ease-out",
                          open ? "rotate-180" : "rotate-0",
                        )}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="flex flex-col gap-[10px]">
                      <div className="flex items-center justify-between text-[13px]">
                        <p>Protocol Fee</p>
                        <p>
                          <span className="line-through opacity-40">
                            0.9 SOL
                          </span>{" "}
                          <span>0</span>
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-[13px]">
                        <p>Maker & Taker Fee</p>
                        <p>
                          <span className="line-through opacity-40">
                            0.9 SOL
                          </span>{" "}
                          <span>0</span>
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-[13px]">
                        <p>Withdrawal Fee</p>
                        <p>
                          <span className="line-through opacity-40">
                            0.9 SOL
                          </span>{" "}
                          <span>0</span>
                        </p>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div> */}
            <div
              className={classNames(
                "transition-opacity duration-200 ",
                isAgree ? "" : "pointer-events-none opacity-20 grayscale ",
              )}
            >
              <AnimatePresence>
                {walletType?.includes("evm") && (
                  <motion.div
                    className="z-50"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 100,
                    }}
                    transition={{
                      ease: "linear",
                      duration: 0.5,
                    }}
                  >
                    {connectors
                      .filter((c) => {
                        if (walletType === "evm") return true;
                        return c.id === walletType.replace("evm-", "");
                      })
                      .map((c) => (
                        <button
                          disabled={!isAgree}
                          className="mb-3 flex h-16 w-full cursor-pointer items-center gap-4 rounded-lg border border-white/[0.08] bg-transparent pl-5"
                          key={c.id}
                          onClick={() => {
                            connectAsync({
                              connector: c,
                            });
                            closeModal();
                          }}
                        >
                          {c.id === "metaMask" && (
                            <Image
                              src={MetaMask}
                              className="w-8 rounded-[5px]"
                              alt="metamask"
                              sizes="(max-width: 600px) 100vw, 70vw"
                            />
                          )}
                          {c.id === "coinbaseWallet" && (
                            <Image
                              src={Coinbase}
                              className="w-8 rounded-[5px]"
                              alt="coinbase"
                              sizes="(max-width: 600px) 100vw, 100vw"
                            />
                          )}
                          {c.id === "walletConnect" && (
                            <WalletConnectIcon className="w-8 rounded-[5px]" />
                          )}
                          <span className="font-medium">{c.name}</span>
                        </button>
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>
              {walletType === "solana" && (
                <WalletMultiButtonCustom
                  disabled={!isAgree}
                  onClickConnect={() => closeModal()}
                />
              )}
            </div>
          </div>
        </div>
        <TopBackground
          className={classNames(
            "absolute left-0 right-0 top-0 w-full text-fcon transition-all duration-200 ease-linear",
          )}
        />
      </div>
      </div>
    </ModalWrapper>
  );
};

export default ModalConnectWallet;
