import { approveNFT, depositNFT, getApproveNFT } from "@/lib/api/nft";
import useContracts from "@/lib/hooks/useContracts";
import { waitForTransaction } from "@wagmi/core";
import { useRequest } from "ahooks";
import { NFTMetada } from "types/nft";
import { Hex } from "viem";
import { useNetwork } from "wagmi";

const DepositModal = ({
  nft,
  collection_address,
}: {
  collection_address: Hex;
  nft?: NFTMetada;
}) => {
  const { chain } = useNetwork();
  const { NFT_INTERACTION_CONTRACT } = useContracts({
    chainId: chain?.id,
  });
  const handleDepositNFT = async (nft: any) => {
    const contract_interaction_address = NFT_INTERACTION_CONTRACT as Hex;
    const isNFTApproved = await getApproveNFT(
      nft.id,
      collection_address,
      contract_interaction_address,
    );
    if (!isNFTApproved) {
      const hashApprove = await approveNFT(
        collection_address,
        contract_interaction_address,
        nft.id,
      );
      await waitForTransaction({ hash: hashApprove.hash as Hex });
      const req = await depositNFT({
        nft_id: nft.id,
        collection_address,
        contract_interaction_address,
      });
      try {
        await waitForTransaction({ hash: req?.hash as Hex });
      } catch (error) {}
      return { hash: req?.hash, nft };
    } else {
      const req = await depositNFT({
        nft_id: nft.id,
        collection_address,
        contract_interaction_address,
      });
      try {
        await waitForTransaction({ hash: req?.hash as Hex });
      } catch (error) {}
      return { hash: req?.hash, nft };
    }
  };
  const { run: runDepositNFT, loading } = useRequest(handleDepositNFT, {
    manual: true,
    onSuccess: (data) => {
      //   if (data) {
      //     setDepositedNft(data.nft.name);
      //   }
      //   runGetCollectionName(collection_address, wallet_address);
      // dispatch(fetchProfileNFTs());
    },
    // retryCount: 2,
  });

  return (
    <div>
    </div>
  );
};

export default DepositModal;
