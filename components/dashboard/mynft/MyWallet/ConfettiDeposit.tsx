import Button from "@/components/shared/button";
import confetti from "canvas-confetti";
import { useEffect } from "react";

const ConfettiDeposit = ({
  nftName,
  close,
}: {
  nftName?: string;
  close: () => void;
}) => {
  useEffect(() => {
    if (nftName) {
      confetti({});
    }
  }, [nftName]);

  return (
    <div className="flex w-full max-w-7xl flex-col items-center gap-3 rounded-[10px] bg-gray1 p-6 text-white dark:text-white">
      <p>
        Congratulations! Your {nftName} has been added to your profile,
        successfully
      </p>
      <p className="text-sm">
        If you wish to withdraw do note that that withdrawal fee is 0.5 ETH
      </p>
      <Button
        onClick={close}
        variant="error"
        className="mx-auto w-fit rounded-[10px] border-none px-5 py-2"
      >
        Close
      </Button>
    </div>
  );
};

export default ConfettiDeposit;
