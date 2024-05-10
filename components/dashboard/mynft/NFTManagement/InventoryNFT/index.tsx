import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { fetchProfileNFTs } from "store/features/user/userSlice";

import LoaderSpinner from "@/components/layout/LoadingSpinner";
import useCheckSolanaWallet from "@/lib/hooks/useCheckSolanaWallet";
import InventoryItem from "./InventoryItem";
import ModalWithdrawNFT from "./ModalWithdraw";
// import { NFTCard } from "../NFTDisplay";

const InventoryNFT = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profileNFTs, loadingProfileNFTs, session } = useSelector(
    (state: RootState) => state.user,
  );
  const { primaryWallet } = useCheckSolanaWallet({});
  const [withdrawNFT, setWithdrawNFT] = useState<
    Record<string, string> | undefined
  >();
  // const { data: primaryWallets, loading: loadingGetPrimaryWallet } = useRequest(
  //   getPrimaryWallet,
  //   {
  //     ready: !!session?.user?.username,
  //   },
  // );

  // const primaryWalletSolana = primaryWallets?.find(
  //   (w: any) =>
  //     w.chain === "solana-mainet-beta" || w.chain === "Solana Mainet Beta",
  // )?.wallet_address;

  // const { run: runGetNFTByMints, loading } = useRequest(getNFTByMints, {
  //   manual: true,
  // });

  // useEffect(() => {
  //   if (profileNFTs.length) {
  //     runGetNFTByMints({
  //       // mints: [
  //       //   "CVqfoJmzzciKKokU2t3CK6GMM2RjGqC9A2rGaVrDPcat",
  //       //   "4b5o9ufSm4Ekyrf1j9qZbsTTsyP7eumzSUFAb6fNPYqX",
  //       //   "3gihB81Yap1MBBhmaitvwSgCzcbnYDUMxArYuhLMag5N",
  //       //   "FSdNdrn8b1pqYaGJhiZtid52XBEeVGyh48G4TdK7BezM",
  //       //   "6ZWaZpqKSYWFdLyyCGdY3HanWJCnZUdoW3S6umdzgXWj",
  //       //   "B1QUxzwMTNhHVG9J8CMsSK1uKx3WdWazJ9WFZToio49E",
  //       //   "G2q8xCpCe95SVUP2vAcAf1fgDaU1qzMaMiXpnDe58K8J",
  //       //   "3NAcCNYkK6bt1yUpsR3EHEQkBFWzdyJkpmsVmcUspgst",
  //       //   "5VHVHFP4ccMAoTgfQc3XWp618wu6a9whH4rrXX9gipx2",
  //       //   "27Q79EVKUeichAyJvhHBAoNWMVwHGBXmuw1rfV5Tqb1T",
  //       //   "9MvGqtgSo2SsyFnTN2Bfj2fguD6TPpD33426j6qACmAw",
  //       //   "3qScbVamTFi4ZxafY6713ykFAL6QsMw1Y9x2bE2UQyou",
  //       //   "2PKtiVsNBXY7ifaDPrmdVoe1RySFaru2Cti9G44o9kXE",
  //       //   "13KLd4u2Lz9xUUznKWywVwv7QKN4HxVYj2RyXJQ8HbNH",
  //       //   "8YKCKVGwnZ9M5vwsdVjN62xD1L7voKfSp9MW4T5qLogH",
  //       //   "3TJUaxL6DC2r2GQGxTrSC746KV5xdwAP8rZqXT6kwfRM",
  //       //   "Dzfye9ZbAoA5TspNLfxZy6hWTVeawQexiCiaNCnmgnYQ",
  //       //   "2FBP8pEhfxNUktVi6g9ygHdFMNKqopkFi2PTzLCuQieP",
  //       //   "7oj8mqGxjEsCcQMerDqyouiZdoHMMkjSUGYN6DV4UvfM",
  //       //   "EQgFWuRGaQKngiHcvqY3RDYJstC1qhc7DTcuAuWmMKa1",
  //       // ].map((i) => new PublicKey(i)),
  //       mints: [...new Set(profileNFTs.map((i: any) => i.nft_id))].map(
  //         (i) => new PublicKey(i),
  //       ),
  //     });
  //   }
  // }, [profileNFTs, runGetNFTByMints]);

  useEffect(() => {
    dispatch(fetchProfileNFTs());
  }, [dispatch]);

  return (
    <>
      <ModalWithdrawNFT
        nft_id={withdrawNFT?.mint}
        nft_name={withdrawNFT?.name || ""}
        logo_url={withdrawNFT?.logo_uri || ""}
        wallet_address={primaryWallet}
        closeModal={() => setWithdrawNFT(undefined)}
        successSubmit={() => dispatch(fetchProfileNFTs())}
      />
      {loadingProfileNFTs && <LoaderSpinner width={20} />}
      {(profileNFTs?.length &&
        profileNFTs.map((nft) => {
          // Extract the text after the "#" character
          return (
            <InventoryItem
              key={nft.account}
              loading={loadingProfileNFTs}
              name={
                nft?.offChainMetadata?.metadata?.name ||
                nft?.onChainMetadata?.metadata?.data?.name ||
                ""
              }
              isStaked={nft.is_staked}
              lockPeriod={nft.locked_period}
              lockedAt={nft.locked_at}
              mint={nft.account}
              uri={
                nft.offChainMetadata?.metadata?.image ||
                "/images/Dashboard/default_planet.png"
              }
              fp_daily_earning={nft.fp_daily_earning}
              withdrawNFT={() => {
                if (primaryWallet) {
                  setWithdrawNFT({
                    mint: nft.account,
                    name: nft.offChainMetadata.metadata?.name || "",
                    logo_uri: nft.offChainMetadata.metadata.image,
                  });
                }
              }}
            />
          );
        })) ||
        null}
    </>
  );
};

export default InventoryNFT;
