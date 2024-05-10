import LoaderSpinner from "@/components/layout/LoadingSpinner";
import Button from "@/components/shared/button";
import Phantom from "@/components/shared/icons/wallets/Phantom";
import { getProfileWalletNFTs } from "@/lib/api/profile";
import useCheckSolanaWallet from "@/lib/hooks/useCheckSolanaWallet";
import usePhantomWallet from "@/lib/hooks/usePhantomWallet";
import { Metaplex } from "@metaplex-foundation/js";
import { PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { utils } from "@project-serum/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import { useRequest } from "ahooks";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Fragment, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import {
  setFilteredNfts,
  setSelectedNFTs,
  setShowTransferConfirmModal,
} from "store/features/user/userSlice";
import { setWalletType } from "store/features/wallet/walletSlice";
import { sleep } from "utils/promise";
import NftItem from "./NftItem";

const NFTDisplay = () => {
  const { connection } = useConnection();
  const { walletPublicKey } = usePhantomWallet();
  const dispatch = useDispatch();
  const { selectedNFTs, filteredNfts } = useSelector(
    (state: RootState) => state.user,
  );
  const { isAbleToDeposit, loadingCheckWallet } = useCheckSolanaWallet({
    currentWallet: walletPublicKey?.toBase58(),
  });
  const metaplex = new Metaplex(connection);

  const seed1 = useMemo(() => {
    return Buffer.from(utils.bytes.utf8.encode("metadata"));
  }, []);
  const seed2 = useMemo(() => {
    return Buffer.from(PROGRAM_ID.toBytes());
  }, []);
  const seed4 = useMemo(() => {
    return Buffer.from(utils.bytes.utf8.encode("edition"));
  }, []);

  const { run: runGetProfileWalletNFTs, loading } = useRequest(
    getProfileWalletNFTs,
    {
      manual: true,
      onSuccess(data, _params) {
        dispatch(setFilteredNfts(data));
      },
    },
  );

  useEffect(() => {
    if (walletPublicKey && connection && isAbleToDeposit) {
      runGetProfileWalletNFTs({
        // wallet_address: "CMy4G6JAgL5dwdPV351GHcvRo7FwZsDkEb72P3L63z7K",
        wallet_address: walletPublicKey.toBase58(),
        connection,
      });
    }
    dispatch(setSelectedNFTs([]));
  }, [walletPublicKey, connection, isAbleToDeposit, runGetProfileWalletNFTs]);

  const handleOpenModal = async () => {
    await sleep(100);
    dispatch(setShowTransferConfirmModal(true));
  };

  return (
    <>
      <div className="h-full max-h-screen w-full overflow-y-scroll px-9 py-9 pb-9 md:max-h-[70vh] md:pb-20">
        {!walletPublicKey && (
          <div className="sticky bottom-0 top-0 items-center justify-center">
            <Button
              onClick={() => {
                dispatch(setWalletType("solana"));
              }}
              className="mx-auto w-full rounded-[10px] py-2 text-black min-[350px]:w-[200px]"
            >
              <div className="flex w-full items-center gap-2">
                <Phantom className="w-7" />
                <span className="font-medium">Connect Wallet</span>
              </div>
            </Button>
          </div>
        )}
        <div className="grid h-full grid-cols-12 gap-2">
          {(loading || loadingCheckWallet) && <LoaderSpinner width={20} />}
          {!!walletPublicKey &&
            isAbleToDeposit &&
            (filteredNfts || [])?.map((item: any) => (
              <Fragment key={item?.uri}>
                <NftItem
                  {...item}
                  metaplex={metaplex}
                  seed1={seed1}
                  seed2={seed2}
                  seed4={seed4}
                />
              </Fragment>
            ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedNFTs.length > 0 && (
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
              duration: 0.07,
            }}
          >
            <div className="absolute bottom-9 left-9 right-9 z-20 flex h-16 overflow-hidden rounded-[10px] bg-gray4">
              <div className="flex flex-1 items-center gap-2 p-2">
                <div className="relative z-30 h-12 w-12 overflow-hidden rounded-[10px]">
                  <Image
                    src="/images/Dashboard/nft-item-demo.png"
                    className="object-cover"
                    alt="mock"
                    fill
                  />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-white/60">
                    Move Stack
                  </p>
                  <p className="font-medium leading-[21px] text-white">
                    {selectedNFTs.length} NFT
                  </p>
                </div>
              </div>
              <Button
                // onClick={handleAddManyNFTsToProfile}
                onClick={handleOpenModal}
                className="px-9 font-medium text-black"
              >
                Transfer to Inventory
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NFTDisplay;
