import { useAccount } from "wagmi";
import MyWallet from "../MyWallet";
import WalletConection from "../WalletConection";

const NFTWallet = () => {
  const { isConnected } = useAccount();

  return (
    <div>
      {isConnected ? (
        <MyWallet />
      ) : (
        <>
          <p className="text-center text-2xl font-bold text-white">
            Connect your wallet
          </p>
          <WalletConection />
        </>
      )}
    </div>
  );
};

export default NFTWallet;
