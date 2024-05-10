import ModalWrapper from "@/components/shared/ModalWrapper";
import Button from "@/components/shared/button";
import ChangeIcon from "@/components/shared/icons/change";
import ChevronDownIcon from "@/components/shared/icons/chevron-down";
import {
  approveNFT,
  compareDepositWithBackend,
  depositNFT,
  getApproveNFT,
  getOwnerNFTCollection,
} from "@/lib/api/nft";
import useContracts from "@/lib/hooks/useContracts";
import { toastError } from "@/lib/toastify";
import { Disclosure, Transition } from "@headlessui/react";
import { useRequest } from "ahooks";
import { NFT_COLLECTIONS } from "constants/nft_collections";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { fetchProfileNFTs } from "store/features/user/userSlice";
import { NFTMetada } from "types/nft";
import { classNames } from "utils/string";
import { Hex } from "viem";
import PackCard from "../PackCard";
import ConfettiDeposit from "./ConfettiDeposit";

type Props = {
  collection_address: Hex;
  wallet_address: Hex;
  chainId: number;
};

const NFTCollection: React.FC<Props> = ({
  collection_address,
  chainId,
  wallet_address,
}) => {
  const { NFT_INTERACTION_CONTRACT } = useContracts({
    chainId: chainId,
  });
  const [depositedNft, setDepositedNft] = useState<NFTMetada>();
  const dispatch = useDispatch<AppDispatch>();
  const {
    run: runGetCollectionName,
    data,
    loading: loadingCollection,
  } = useRequest(
    () => getOwnerNFTCollection(collection_address, wallet_address),
    {
      pollingInterval: 20000,
    },
  );

  const { runAsync: runApproveNFT, loading: loadingApprovalNFT } = useRequest(
    approveNFT,
    {
      manual: true,
    },
  );
  const { runAsync: runDepositNFT, loading: loadingDepositNFT } = useRequest(
    depositNFT,
    {
      manual: true,
      onError: (e) => {
        toastError(e.name);
      },
    },
  );

  const { runAsync: runCompareDeposit, loading: loadingCompareDeposit } =
    useRequest(compareDepositWithBackend, {
      manual: true,
    });

  const handleDepositNFT = async (nft: any) => {
    const contract_interaction_address = NFT_INTERACTION_CONTRACT;
    if (!contract_interaction_address) return;
    const isNFTApproved = await getApproveNFT(
      nft.id,
      collection_address,
      contract_interaction_address,
    );
    let hash;
    if (!isNFTApproved) {
      await runApproveNFT(
        collection_address,
        contract_interaction_address,
        nft.id,
      );
      const req = await runDepositNFT({
        nft_id: nft.id,
        collection_address,
        contract_interaction_address,
      });
      hash = req?.hash;
    } else {
      const req = await runDepositNFT({
        nft_id: nft.id,
        collection_address,
        contract_interaction_address,
      });
      hash = req?.hash;
    }
    if (hash) {
      await runCompareDeposit({
        chainId,
        collectionName: NFT_COLLECTIONS[collection_address] as string,
        hash,
        id: nft.id,
        wallet_address,
      });
      return { hash, nft };
    }
  };
  const { run: runHandleDepositNFT, loading } = useRequest(handleDepositNFT, {
    manual: true,
    onSuccess: (data) => {
      if (data) {
        setDepositedNft(data.nft);
      }
      runGetCollectionName();
      dispatch(fetchProfileNFTs());
    },
    // retryCount: 2,
  });

  // useEffect(() => {
  //   if (collection_address && wallet_address) {
  //     runGetCollectionName();
  //   }
  // }, [collection_address, runGetCollectionName, wallet_address]);

  return (
    <>
      <ModalWrapper
        open={!!depositedNft}
        // open
        onClose={() => {
          setDepositedNft(undefined);
        }}
      >
        <ConfettiDeposit
          nftName={depositedNft?.name}
          close={() => setDepositedNft(undefined)}
        />
      </ModalWrapper>
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button className="mb-2 mt-5 flex w-full items-center justify-between">
              <span className="text-xl font-bold">{data?.collectionName}</span>
              <div
                style={{
                  background: "rgba(217, 217, 217, 0.10)",
                }}
                className="h-10 w-10 rounded-full p-2"
              >
                <ChevronDownIcon
                  className={`${
                    open ? "" : "rotate-180 transform"
                  } h-6 w-6 text-white`}
                />
              </div>
            </Disclosure.Button>
            <Transition
              enter="transition ease duration-500 transform"
              enterFrom="opacity-0 -translate-y-0"
              enterTo="opacity-100 translate-y-[5px]"
              leave="transition ease duration-500 transform"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-[5px]"
            >
              <Disclosure.Panel className="relative h-[480px] ">
                <div
                  className={classNames(
                    "sticky flex h-full w-full items-center justify-center bg-black/10 transition-all duration-100 ease-linear",
                    loading ? "z-10 opacity-100" : "z-0 opacity-0",
                  )}
                >
                  <div className="flex rounded-[10px] bg-black/50 p-2 text-lg text-white">
                    {loadingApprovalNFT ? <p>Waiting for approval </p> : null}
                    {loadingDepositNFT ? (
                      <p>Waiting for confirmation </p>
                    ) : null}
                    <p className="animate-bounce">.</p>
                    <p className="animate-[bounce_1s_infinite_100ms]">.</p>
                    <p className="animate-[bounce_1s_infinite_150ms]">.</p>
                  </div>
                </div>
                <div
                  className={classNames(
                    "absolute left-0 right-0 top-0 grid h-[480px] grid-cols-12 gap-4 overflow-scroll",
                  )}
                >
                  {data?.listNFTIds
                    .filter((nft) => !!nft?.id)
                    .map((nft, idx) => {
                      return (
                        <div
                          key={`nft-${nft?.id}-${idx}`}
                          className="col-span-12 w-full sm:col-span-6 md:col-span-4 lg:col-span-3"
                        >
                          <PackCard
                            {...nft}
                            footerCard={
                              <Button
                                //   onClick={() =>
                                //     runHandleDepositNFT(
                                //       nft.id,
                                //       nft.collection_address,
                                //       address: wallet_address
                                //     )
                                //   }
                                loading={loading}
                                onClick={() => {
                                  runHandleDepositNFT(nft);
                                }}
                                className="h-[36px] w-full rounded-[10px] bg-[#00FFC2] px-3 text-gray0 max-[320px]:px-0"
                              >
                                <div className="flex h-full items-center justify-center gap-2">
                                  {/* {loading ? (
                                  <SpinnerIcon className="h-8 w-8" />
                                ) : (
                                )} */}
                                  <ChangeIcon className="h-[14px] w-[15px]" />
                                  <span className="text-[13px] font-normal">
                                    Add to My Profile
                                  </span>
                                </div>
                              </Button>
                            }
                          />
                        </div>
                      );
                    })}
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default NFTCollection;
