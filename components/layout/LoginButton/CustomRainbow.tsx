import Button from "@/components/shared/button";
import { useRequest } from "ahooks";
import { getCsrfToken, signIn } from "next-auth/react";
import { useEffect } from "react";
import { SiweMessage } from "siwe";
import { consoleError } from "utils/string";
import { useDisconnect, useSignMessage } from "wagmi";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

import { useDispatch } from "react-redux";
import { setWalletType } from "store/features/wallet/walletSlice";
import { classNames } from "utils/string";
import usePhantomWallet from "@/lib/hooks/usePhantomWallet";

const CustomWallet = ({
  openConnectModal,
  address,
  connected,
  shouldLoginAfterConnect,
}: {
  connected: boolean;
  openConnectModal: () => void;
  address?: string;
  shouldLoginAfterConnect?: boolean;
}) => {
  const { signMessageAsync } = useSignMessage();
  const dispatch = useDispatch();
  const { walletPublicKey, disconnect, signMessage } = usePhantomWallet();
  const handleLogin = async () => {
    const message = new SiweMessage({
      domain: window.location.host,
      address,
      statement: "Sign in with Ethereum to the app.",
      uri: window.location.origin,
      version: "1",
      nonce: await getCsrfToken(),
    });
    const encodeMessage = new TextEncoder().encode("signed in message");
    if (signMessage) {
      const signature = await signMessage(encodeMessage);
      // Use the signature as needed
      await signIn("siwe", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
      });
    } else {
      console.error('signMessage function is undefined');
      // Handle the case where signMessage is undefined
    }
  };

  const { loading, run } = useRequest(handleLogin, {
    onError: (error) => {
      consoleError(error.message);
      disconnect();
    },
    manual: true,
    ready: shouldLoginAfterConnect,
  });

  useEffect(() => {
    if (connected) {
      run();
    }
  }, [connected]);

  return (
    <div>
        <Button
          onClick={() => {
            dispatch(setWalletType("solana"));
          }}
          className={classNames(
            "h-12 w-full font-chakraPetch text-black",
            walletPublicKey ? "!hidden" : "",
          )}
        >
          Connect
        </Button>
        <Button
          onClick={() => {
            disconnect();
          }}
          className={classNames(
            "h-12 w-full font-chakraPetch text-black",
            !walletPublicKey ? "!hidden" : "",
          )}
        >
          Disconnect
        </Button>
    </div>
  );
};

export default CustomWallet;
