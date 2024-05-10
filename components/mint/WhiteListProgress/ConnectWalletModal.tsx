import Coinbase from "@/components/shared/icons/wallets/Coinbase";
import Image from "next/image";
import MetaMask from "public/images/wallets/metamask.png";
import { goerli, mainnet } from "viem/chains";
import { useConnect } from "wagmi";

const ConnectWalletModal = ({
  onSelectChain,
}: {
  onSelectChain: () => void;
}) => {
  const { connectors, connectAsync } = useConnect();
  const chainId =
    process.env.NEXT_PUBLIC_ENV === "testnet" ? goerli.id : mainnet.id;
  return (
    <div className="w-[400px] max-w-2xl rounded-lg bg-black/90 p-10 font-aeonikPro text-white">
      <p className="mb-5 text-center text-2xl font-medium">
        Connect Your Wallet
      </p>
      <div className="text-white">
        {connectors.map((c) => (
          <div
            className="mb-3 flex h-16 w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-white/10 bg-transparent py-1"
            key={c.id}
            onClick={() => {
              connectAsync({
                connector: c,
              });
              onSelectChain();
            }}
          >
            {c.id === "metaMask" && (
              <Image
                src={MetaMask}
                className="w-10"
                alt="metamask"
                sizes="(max-width: 600px) 100vw, 100vw"
              />
            )}
            {c.id === "coinbaseWallet" && <Coinbase className="w-10" />}
            {c.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectWalletModal;
