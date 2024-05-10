import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRequest } from "ahooks";
import { getCsrfToken, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { SiweMessage } from "siwe";
import { RootState } from "store";
import { consoleError } from "utils/string";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import CustomWallet from "./CustomRainbow";

//import dynamic custom button

const LoginButton = ({
  shouldLoginAfterConnect,
}: {
  shouldLoginAfterConnect?: boolean;
}) => {
  const { signMessageAsync } = useSignMessage();
  const { address, isConnected } = useAccount();
  const { connectors, connectAsync } = useConnect();
  const { disconnect } = useDisconnect();
  const { session } = useSelector((state: RootState) => state.user);

  const handleConnectWallet = async (method: string) => {
    if (!method) return;
    try {
      const connector = connectors.find((c) => c.id === method);
      if (connector) {
        const d = await connectAsync({
          connector,
        });
        return {
          walletAddress: d.account,
        };
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleLogin = async () => {
    const message = new SiweMessage({
      domain: window.location.host,
      address,
      statement: "Sign in with Ethereum to the app.",
      uri: window.location.origin,
      version: "1",
      nonce: await getCsrfToken(),
    });
    const signature = await signMessageAsync({
      message: message.prepareMessage(),
    });
    signIn("siwe", {
      message: JSON.stringify(message),
      redirect: false,
      signature,
    });
  };

  const { loading } = useRequest(handleLogin, {
    onError: (error) => {
      consoleError(error.message);
      disconnect();
    },
    manual: true,
  });

  useEffect(() => {
    disconnect();
  }, []);

  return (
    <ConnectButton.Custom>
      {/* {({ openConnectModal, mounted }) => {
        console.log("LoginButton", openConnectModal);
        if (mounted)
          return <CustomRainbow openConnectModal={openConnectModal} />;
      }} */}
      {({ account, openConnectModal, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted;
        const connected = ready && !!account?.address;

        return (
          <>
            {(() => {
              return (
                <CustomWallet
                  connected={connected}
                  address={account?.address}
                  openConnectModal={openConnectModal}
                  shouldLoginAfterConnect={shouldLoginAfterConnect}
                />
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default LoginButton;
