import ModalWrapper from "@/components/shared/ModalWrapper";
import Button from "@/components/shared/button";
import FconIcon from "@/components/shared/icons/crypto/fcon";
import Phantom from "@/components/shared/icons/wallets/Phantom";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRequest } from "ahooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { setUpdatedAt } from "store/features/user/userSlice";
import { createSignInData } from "utils/createSignInData";
import { sleep } from "utils/promise";

const ConnectPhantomModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const { signIn } = useWallet();
  const { session } = useSelector((state: RootState) => state.user);

  const handleSignPhantom = async () => {
    await sleep(1000);
    const signinData = await createSignInData();
    const d = await signIn?.(signinData);
    if (d) {
      const req = await fetch("/api/user/bind-phantom-wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet_address: d.account.address,
        }),
      });
      const data = await req.json();

      if (req.ok) return true;
      const err =
        data?.message === "REQUEST_INVALID"
          ? "Wallet is binded to another account, please select another wallet."
          : "Something went wrong, please try again.";
      throw new Error(err);
    }
    return false;
  };

  const { error, run, loading } = useRequest(handleSignPhantom, {
    manual: true,
    onSuccess: (e) => {
      if (e) {
        dispatch(setUpdatedAt(Date.now()));
      }
    },
  });

  useEffect(() => {
    if (session?.user?.public_id) {
      const phantomWallet = session?.user?.wallets?.find((w) => !w.is_evm);
      if (phantomWallet) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    }
  }, [session]);

  return (
    <ModalWrapper open={open} onClose={() => {}}>
      <div className="w-screen max-w-[662px] bg-white/[0.08]">
        <div className="border-b border-white/[0.08] py-3 text-center text-xl font-medium text-white">
          Connect Phantom Wallet
        </div>
        <div className="mx-5 border border-fcon bg-fcon/10 p-3 text-white">
          <p>
            Bind your Phantom wallet to your account to claim reward{" "}
            <FconIcon className="inline w-3" /> from the Aviatrix Championship.
          </p>
        </div>
        <div className="p-3">
          <div className="mb-3 flex justify-center pt-2">
            <Button loading={loading} onClick={run} className="rounded p-5">
              <div className="flex items-center gap-2 font-medium">
                <Phantom className="w-10" />
                <p>Bind Phantom Wallet</p>
              </div>
            </Button>
          </div>
          {!loading && error?.message && (
            <p className="text-center text-sm font-medium text-red-500">
              {/* Wallet is binded to another account, please select another wallet. */}
              {error.message}
            </p>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ConnectPhantomModal;
