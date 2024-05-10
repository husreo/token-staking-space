"use client";

import LoadingComponent from "@/components/layout/LoadingComponent";
import ModalWrapper from "@/components/shared/ModalWrapper";
import Button from "@/components/shared/button";
import {
  addManySolanaNFTsToProfile,
  transferInventoryWithBackend,
} from "@/lib/api/nft";
import { getProfileWalletNFTs } from "@/lib/api/profile";
import usePhantomWallet from "@/lib/hooks/usePhantomWallet";
import useSolanaNfts from "@/lib/hooks/useSolanaNfts";
import { addressEllipsis } from "@/lib/utils/common";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useRequest } from "ahooks";
import { SOLANA_CHAIN_DEVNET, SOLANA_CHAIN_MAINNET } from "constants/global";
import { NFT_COLLECTIONS_TRANSFER_INVENTORY } from "constants/nft_collections";
import { ADDRESS_WALLET_NFT } from "constants/payment";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import {
  setFilteredNfts,
  setSelectedNFTs,
  setShowTransferConfirmModal,
  setUserNFTs,
} from "store/features/user/userSlice";
import { sleep } from "utils/promise";
import { classNames } from "utils/string";
import Translation from "utils/translation";
import { Hex } from "viem";

interface IModalTransferToInventoryProps {}

interface INFTItemProps {
  item: {
    name: string;
    logoURI: string;
    metadataAccount?: string;
    mint?: string;
    tokenAccount?: string;
    masterEditionPDA?: string;
    isMasterEdition?: boolean;
    active?: boolean;
  };
}

export default function ModalTransferToInventory(
  props: IModalTransferToInventoryProps,
) {
  const dispatch = useDispatch();
  const { getSolanaWalletNFTs, userNFT } = useSolanaNfts();
  const { sendTransaction, signAllTransactions } = useWallet();
  const { walletPublicKey } = usePhantomWallet();
  const { connection } = useConnection();
  const { selectedNFTs, showTranferConfirmModal } = useSelector(
    (state: RootState) => state.user,
  );
  const [transferSuccess, setTransferSuccess] = useState<null | boolean>(false);
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferCallContractLoading, setTransferCallContractLoading] =
    useState(false);
  const [reSubmitState, setReSubmitState] = useState<any>({});
  const [selectedNFTsSuccessState, setSelectedNFTsSuccessState] = useState<any>(
    {},
  );

  useEffect(() => {
    if (transferSuccess && userNFT) {
      dispatch(setUserNFTs(userNFT));
    }
  }, [transferSuccess, userNFT]);

  // useEffect(() => {
  //   if (!showTranferConfirmModal) {
  //     dispatch(setSelectedNFTs([]));
  //   }
  // }, [showTranferConfirmModal]);

  const { runAsync: runTransferInventory, loading: loadingCompareDeposit } =
    useRequest(transferInventoryWithBackend, {
      manual: true,
    });

  const handleClose = async () => {
    dispatch(setShowTransferConfirmModal(false));
    await sleep(300);
    setTransferSuccess(false);
  };

  const handleAddManyNFTsToProfile = async () => {
    if (!walletPublicKey) {
      alert("You need to connect with your wallet first!");
      return;
    }
    try {
      setTransferLoading(true);
      setTransferCallContractLoading(true);
      const tx_hash = await addManySolanaNFTsToProfile({
        sendTransaction,
        signAllTransactions,
        connection,
        address: walletPublicKey,
        nfts: selectedNFTs.map((nft) => nft.mint),
      });

      if (tx_hash && tx_hash?.length > 0) {
        setReSubmitState({
          chain: SOLANA_CHAIN_DEVNET,
          collectionName: NFT_COLLECTIONS_TRANSFER_INVENTORY,
          tx_hash: tx_hash?.[0] as Hex,
          from_address: `${walletPublicKey}`,
          to_address: `${ADDRESS_WALLET_NFT}`,
          token_addresses: selectedNFTs.map((nft) => nft.mint),
        });
        setSelectedNFTsSuccessState(selectedNFTs);
        await runTransferInventory({
          chain:
            process.env.NEXT_PUBLIC_ENV === "testnet"
              ? SOLANA_CHAIN_DEVNET
              : SOLANA_CHAIN_MAINNET,
          collectionName: NFT_COLLECTIONS_TRANSFER_INVENTORY,
          tx_hash: tx_hash?.[0] as Hex,
          from_address: `${walletPublicKey}`,
          to_address: `${ADDRESS_WALLET_NFT}`,
          token_addresses: selectedNFTs.map((nft) => nft.mint),
        });
        await sleep(2000);
        try {
          getProfileWalletNFTs({
            wallet_address: walletPublicKey.toBase58(),
            connection,
          })
            .then((_filteredNfts: any) => {
              dispatch(setFilteredNfts(_filteredNfts));
            })
            .catch(() => {});
        } catch (error) {}
        setTransferCallContractLoading(false);
        setTransferLoading(false);
        setTransferSuccess(true);
        dispatch(setSelectedNFTs([]));
        return true;
      }
      setTransferLoading(false);
      setTransferCallContractLoading(false);
      return false;
    } catch (e: any) {
      console.log(e);
      setTransferLoading(false);
      setTransferCallContractLoading(false);
      return false;
    }
  };

  return (
    <ModalWrapper
      onClose={() => {
        dispatch(setShowTransferConfirmModal(false));
      }}
      open={showTranferConfirmModal}
    >
      <div
        suppressHydrationWarning
        className="flex w-screen items-center justify-center px-5 sm:w-fit"
      >
        <div
          className="relative h-full w-full rounded-[20px] border border-white/[0.12] bg-gray1 font-aeonikPro
           font-normal text-white max-lg:max-h-screen max-lg:overflow-y-scroll sm:min-h-[351px] sm:w-[560px]"
        >
          <div className="relative z-20 p-9 max-[320px]:p-3 sm:px-[36px] sm:pb-[36px] sm:pt-[48px]">
            <div className="w-full">
              {transferSuccess && (
                <div className="mb-3 flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    fill="none"
                  >
                    <circle cx="30" cy="30" r="30" fill="#24BE3D" />
                    <path
                      stroke="#fff"
                      strokeWidth="4"
                      d="m18 29.5 9.709 8.5L41.5 23"
                    />
                  </svg>
                </div>
              )}
              <div
                className={classNames(
                  "text-[32px] font-medium leading-[normal]",
                  transferSuccess
                    ? "mb-5 px-24 text-center"
                    : "px-28 text-center",
                )}
              >
                {transferSuccess
                  ? `Successfully transferred`
                  : `Transfer to Inventory`}
              </div>
              {!transferSuccess && (
                <div className="mb-5 mt-2 px-24 text-center opacity-60">
                  Confirm your NFT deposit by clicking “Transfer Now”
                </div>
              )}
              <div
                className={classNames(
                  "mb-9 flex flex-col gap-2 overflow-hidden overflow-y-auto",
                  selectedNFTs?.length > 3
                    ? "sm:h-[444px]"
                    : selectedNFTs?.length > 2
                    ? "sm:h-[312px]"
                    : selectedNFTs?.length > 1
                    ? "h-[180px]"
                    : "h-[124px]",
                )}
              >
                {transferCallContractLoading && (
                  <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-[#101111]/50">
                    <LoadingComponent />
                  </div>
                )}
                {(transferSuccess
                  ? selectedNFTsSuccessState
                  : selectedNFTs
                )?.map((i: any) => (
                  <Fragment key={i?.mint}>
                    <NFTItem item={i} />
                  </Fragment>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <Button
                variant="outlined"
                // onClick={() => reset()}
                onClick={async () => {
                  dispatch(setShowTransferConfirmModal(false));
                  await sleep(300);
                  setTransferSuccess(false);
                }}
                // loading={transferLoading}
                type="button"
                className="flex-1 rounded-[100px] border border-gray6 bg-transparent py-3 font-medium text-gray6 transition-all duration-150 hover:bg-gray6 hover:text-black"
              >
                <Translation
                  text={transferSuccess ? "button.done" : "button.cancel"}
                />
              </Button>
              <Button
                variant="default"
                className="flex-1 rounded-[100px] bg-gray0 py-3 text-black"
                onClick={
                  transferSuccess ? handleClose : handleAddManyNFTsToProfile
                }
                // onClick={handleShowToggleModalSuccess}
                loading={transferLoading}
                // loading
              >
                <Translation
                  text={
                    transferSuccess
                      ? "button.transfer-more"
                      : "button.transfer-now"
                  }
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

const NFTItem = (props: INFTItemProps) => {
  const { item } = props;
  return (
    <div className="flex h-[124px] items-center gap-4 rounded-lg bg-[#ffffff08] p-6">
      <div className="relative h-[76px] w-[76px]">
        <Image
          src={item?.logoURI || "/images/Dashboard/nft-item-demo.png"}
          className="object-cover"
          fill
          alt="nft_item"
        />
      </div>
      <div>
        <div>#{item?.name}</div>
        <div className="text-xs text-gray6">
          {addressEllipsis(item?.mint ?? "", 6, 12)}
        </div>
      </div>
    </div>
  );
};
