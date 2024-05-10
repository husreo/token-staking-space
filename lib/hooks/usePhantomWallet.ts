import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

const usePhantomWallet = () => {
  const [walletPublicKey, setWalletPublicKey] = useState<PublicKey | null>();
  const [hasPhantom, setHasPhantom] = useState(false);
  const { disconnect, connect, signMessage, signIn } = useWallet();

  const getProvider = () => {
    if ("phantom" in window) {
      // @ts-ignore
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        setHasPhantom(true);
      } else {
        setHasPhantom(false);
        // window.open("https://phantom.app/", "_blank");
      }
    }
  };

  useEffect(() => {
    // @ts-ignore
    window.phantom?.solana.on("accountChanged", async (pk: PublicKey) => {
      setWalletPublicKey(pk);
    });
    // @ts-ignore
    window.phantom?.solana.on("connect", (pk: PublicKey) => {
      setWalletPublicKey(pk);
    });
    // @ts-ignore
    window.phantom?.solana.on("disconnect", async () => {
      setWalletPublicKey(null);
    });
    // @ts-ignore
    if (window.phantom?.solana._publicKey) {
      // @ts-ignore
      setWalletPublicKey(window.phantom?.solana._publicKey as PublicKey);
    }
    getProvider();
  }, []);

  return { hasPhantom, walletPublicKey, disconnect, signMessage, signIn };
};

export default usePhantomWallet;
