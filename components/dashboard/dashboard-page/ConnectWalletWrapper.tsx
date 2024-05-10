import LoginButton from "@/components/layout/LoginButton";
import Button from "@/components/shared/button";
import { ReactNode } from "react";
import { useAccount, useChainId, useConnect, useSwitchNetwork } from "wagmi";

const ConnectWalletWrapper = ({
  targetChainId,
  children,
}: {
  targetChainId: number;
  children: ReactNode;
}) => {
  const { isConnected, isConnecting } = useAccount();
  const { connectors, connectAsync } = useConnect();
  const { switchNetwork } = useSwitchNetwork();
  const currentChainID = useChainId();

  const handleConnectWallet = async () => {
    const connector = connectors.find(
      (connector) => connector.id === "metaMask",
    );
    if (connector) {
      await connectAsync({
        connector,
      });
    }
  };

  return (
    <>
      {!isConnected ? (
        <div className="h-20 w-full font-semibold text-xl">
          <LoginButton />
        </div>
      ) : (
        (currentChainID === targetChainId && children) || (
          <Button
            className="h-[86px] w-full text-xl font-bold text-black shadow-topBtn"
            onClick={() => {
              switchNetwork?.(targetChainId);
            }}
            loading={isConnecting}
          >
            SWITCH NETWORK
          </Button>
        )
      )}
    </>
  );
};

export default ConnectWalletWrapper;
