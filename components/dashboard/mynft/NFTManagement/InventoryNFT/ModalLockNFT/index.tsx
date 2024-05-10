import ModalWrapper from "@/components/shared/ModalWrapper";
import { useState } from "react";
import BonusDetail from "./BonusDetail";
import Button from "@/components/shared/button";
import Translation from "utils/translation";

const ModalLockNFT = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((p) => !p);

  return (
    <>
      <ModalWrapper open={open} onClose={toggleOpen}>
        <div className="mt-10 w-[560px] rounded-[20px] bg-gray1 px-10 pb-9 font-aeonikPro text-white lg:px-14 lg:pt-16">
          <p className="mb-10 text-center text-[32px] font-medium">
            Double your earnings by Secure lock for 3 months.
          </p>
          <BonusDetail />
          <div className="mb-5 mt-9 flex items-center justify-between">
            <p className="font-light text-white/[0.76]">Unlock Time</p>
            <p className="font-dinPro text-[15px] font-medium">
              15:21:22, April 8, 2024
            </p>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Button
              variant="outlined"
              // onClick={() => reset()}

              // loading={transferLoading}
              type="button"
              className="flex-1 rounded-[100px] border border-gray6 bg-transparent py-3 text-gray6 transition-all duration-150 hover:bg-gray6 hover:text-black"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              className="flex-1 rounded-[100px] bg-gray0 py-3 text-black"

              // loading
            >
              Lock Now
            </Button>
          </div>
        </div>
      </ModalWrapper>
      <button
        onClick={toggleOpen}
        className="mr-2 rounded border border-white/[0.21] px-2 py-[6px] text-[13px] font-light"
      >
        Double your earnings
      </button>
    </>
  );
};

export default ModalLockNFT;
