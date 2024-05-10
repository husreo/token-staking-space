"use client";

import LoaderSpinner from "@/components/layout/LoadingSpinner";
import { getProfileNftDetail } from "@/lib/api/profile";
import classNames from "classnames";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setSelectedNFTs } from "store/features/user/userSlice";

const NftItem = (props: any) => {
  const [nftData, setNftData] = useState<any>(null);

  const dispatch = useDispatch();
  const { selectedNFTs } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (props.uri) {
      getProfileNftDetail(
        {
          mintAddress: props?.mintAddress,
          name: props?.name,
          collection: props?.collection,
          address: props?.address,
        },
        props?.metaplex,
        props?.seed1,
        props?.seed2,
        props?.seed4,
      )
        .then((obj: any) => {
          setNftData(obj);
        })
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.uri]);

  const isActive = useMemo(() => {
    return selectedNFTs.find((n) => n.mint === nftData?.mint);
  }, [selectedNFTs, nftData]);
  console.log(props.uri);
  const addNFT = (nft: any) => {
    if (selectedNFTs?.length === 5) return;
    const newSelectedNFTs = [...selectedNFTs, nft];
    dispatch(setSelectedNFTs(newSelectedNFTs));
  };

  const deselectNFT = (nft: any) => {
    if (selectedNFTs.length === 1) {
      dispatch(setSelectedNFTs([]));
    }
    const newSelectedNFTs = selectedNFTs.filter((n) => n.mint !== nft.mint);
    dispatch(setSelectedNFTs(newSelectedNFTs));
  };

  return (
    <div className="group relative z-10 col-span-12 h-[186px] md:col-span-6 lg:col-span-4 xl:col-span-3">
      <div
        className={classNames(
          "flex h-full flex-col overflow-hidden rounded-[10px] border",
          isActive ? " border-[#00FFC2]" : "border-white/[0.12]",
        )}
      >
        <div className="relative flex-1">
          {nftData ? (
            <Image
              // src={nftData?.logoURI || "/images/Dashboard/nft-item-demo.png"}
              src={nftData?.logoURI || "/images/Dashboard/nft-item-demo.png"}
              className="object-cover"
              fill
              alt="nft_item"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            />
          ) : (
            <div className="absolute bottom-0 left-0 right-0 top-10 z-10 bg-[#101111]/50">
              <LoaderSpinner width={20} />
            </div>
          )}
        </div>
        <div className="flex h-12 w-full items-center justify-between gap-2 px-2">
          {nftData && (
            <>
              <div>{`#${nftData?.name ?? ""}`}</div>
            </>
          )}
        </div>
      </div>
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 255, 194, 0.00) 0%, rgba(0, 255, 194, 0.45) 100%)",
          backdropFilter: "blur(17px)",
        }}
        className={classNames(
          "absolute bottom-0 left-0 right-0 top-0 z-10 flex items-end rounded-[10px] p-3 opacity-0 transition-all duration-150 ease-out",
          selectedNFTs?.length < 5
            ? "group-hover:opacity-100"
            : selectedNFTs.find((n) => n.mint === nftData?.mint)
            ? "group-hover:opacity-100"
            : "",
          nftData?.mint ? "" : "hidden",
        )}
      >
        {!selectedNFTs.find((n) => n.mint === nftData?.mint) ? (
          <button
            onClick={() => addNFT(nftData)}
            className={classNames(
              "flex h-fit min-h-[22px] flex-1 items-center justify-center rounded-[10px] bg-black/60 p-[7px] font-aeonikPro text-[13px]",
              selectedNFTs?.length === 5
                ? "pointer-events-none"
                : "pointer-events-auto",
            )}
          >
            + Transfer to Inventory
          </button>
        ) : (
          <button
            onClick={() => deselectNFT(nftData)}
            className="flex h-fit min-h-[22px] flex-1 items-center justify-center rounded-[10px] bg-black/60 p-[7px] font-aeonikPro text-[13px]"
          >
            - Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default NftItem;
