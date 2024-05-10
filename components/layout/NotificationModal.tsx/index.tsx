"use client";
import ModalWrapper from "@/components/shared/ModalWrapper";
import Button from "@/components/shared/button";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Banner from "./Banner";
const SpaceFalconIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 81 174"
    >
      <g clipPath="url(#clip0_2031_283)">
        <path
          fill="#00FFC2"
          d="M80.723 87.03c0-1.6-.65-3.14-1.78-4.27l-9.659-9.568v49.149l-15.392-15.649-4.95-4.934L63.55 87.392V22.337L40.447.397l-23.043 21.94V86.94l15.075 15.015-20.794 20.432v-49.21l-9.658 9.568a5.994 5.994 0 00-1.78 4.27v62.595l17.157-16.871v17.686c0 1.615.649 3.154 1.796 4.286l7.786 7.681v-39.069l7.772-7.636v52.379l5.719 5.674 5.72-5.674v-52.454l7.816 7.711v40.201l7.787-7.681a6.018 6.018 0 001.795-4.286v-18.788l17.128 16.902V87.03zm-51.88-5.312V27.166l11.604-11.06 11.664 11.06V82.67L40.87 93.715 28.842 81.718z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_2031_283">
          <path
            fill="#fff"
            d="M0 0H80.477V173.343H0z"
            transform="translate(.246 .396)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
};
export default function NotificationModal() {
  const [openModal, setModal] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const handleCloseModal = () => {
    setModal(false);
  };

  const handleMintNow = () => {
    router.push("/dashboard");
    setModal(false);
  };
  const handleNotShowToday = (event: any) => {
    if (event.target.checked) {
      const today = new Date().toISOString().slice(0, 10);
      localStorage.setItem("notShowModalDate", today);
      setModal(false);
    }
  };
  useEffect(() => {
    const showModal = () => {
      const notShowDate = localStorage.getItem("notShowModalDate");
      const today = new Date().toISOString().slice(0, 10);
      if (notShowDate === today) {
        setModal(false);
      } else {
        setModal(true);
      }
    };
    showModal();
  }, []);
  return (
    <ModalWrapper onClose={handleCloseModal} open={openModal}>
      <div className="relative flex min-h-[600px] w-full flex-col items-center justify-center bg-white/[0.08] text-center font-chakraPetch text-white backdrop-blur-[20px] max-md:mx-auto min-[414px]:w-[400px] sm:min-h-[775px] sm:w-[500px] md:w-[662px]">
        <Banner />
        <div className="flex flex-col items-center justify-center">
          <div className="mb-[42px] mt-[40px] sm:mt-[80px]">
            <div className="flex h-[135px] w-[135px] items-center justify-center rounded-full border-[11px] border-white/[0.12] sm:h-[270px] sm:w-[270px]">
              <SpaceFalconIcon className=" h-[86.5px] w-[40px] sm:h-[173px] sm:w-[80px]" />
            </div>
          </div>
          <div className="flex w-full flex-col items-center sm:w-[450px]">
            <p className="text-2xl font-bold uppercase leading-[38px] sm:text-[30px]">
              HUGE AIRDROP COMING FOR NFT MINTERS
            </p>
            <p className="text-base leading-6">
              MINT NOW TO BE ELIGIBLE FOR FCON AIRDROP
            </p>
            <div className="mt-6 flex items-center gap-[10px]">
              <label
                className="relative flex cursor-pointer items-center"
                htmlFor="check"
              >
                <input
                  type="checkbox"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none border-[3px] border-fcon
              bg-transparent text-fcon transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4
              before:rounded-full before:bg-fcon before:opacity-0 before:transition-opacity
             checked:border-fcon checked:bg-fcon checked:before:bg-fcon hover:before:opacity-10"
                  id="check"
                  onChange={(e) => handleNotShowToday(e)}
                />
                <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
              DO NOT SHOW THIS AGAIN
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 flex w-full text-xl">
          <Button
            variant="cancel"
            className="h-16 w-1/2 !font-chakraPetch font-bold text-white sm:h-[86px]"
            onClick={() => setModal(false)}
          >
            CLOSE
          </Button>
          <Button
            onClick={handleMintNow}
            className="h-16 w-3/4 !font-chakraPetch font-bold text-black shadow-topBtn sm:h-[86px]"
          >
            MINT NOW
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
