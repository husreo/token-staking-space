import ModalWrapper from "@/components/shared/ModalWrapper";
import XIcon from "@/components/shared/icons/x-icon";
import { useCountDown, useRequest } from "ahooks";
import dayjs, { Dayjs } from "dayjs";

import LoaderSpinner from "@/components/layout/LoadingSpinner";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { fetchProfileNFTs } from "store/features/user/userSlice";
import FinishStaking from "./FinishStaking";
import StakingInfor from "./StakingInfor";

const ModalStakingNFT = ({
  nftName,
  isStaked,
  lockPeriod,
  lockedAt,
  mint,
}: {
  nftName: string;
  isStaked?: boolean;
  lockedAt: string;
  lockPeriod: number;
  mint: string;
}) => {
  const [open, setOpen] = useState(false);
  const [stakingStatus, setStakingStatus] = useState<
    "idle" | "finish" | "error"
  >("idle");

  const dispatch = useDispatch<AppDispatch>();
  const toggleOpen = () => setOpen((p) => !p);
  const [targetDate, setTargetDate] = useState<Dayjs | undefined>();

  const [_t, formatRes] = useCountDown({
    targetDate: targetDate,
  });
  const { days, hours, minutes } = formatRes;

  const stakeNFT = async (mint: string) => {
    const req = await fetch("/api/nft/stake", {
      method: "POST",
      body: JSON.stringify({
        token_address: mint,
      }),
    });
    if (req.status === 200) {
      return true;
    }
    return false;
  };

  const { run, loading } = useRequest(() => stakeNFT(mint), {
    manual: true,
    ready: !!mint,
    onSuccess: (d) => {
      if (d) {
        setStakingStatus("finish");
        dispatch(fetchProfileNFTs());
      }
    },
  });

  useEffect(() => {
    if (isStaked && lockPeriod && lockedAt) {
      setTargetDate(dayjs(lockedAt).add(lockPeriod, "day"));
    }
  }, [isStaked, lockPeriod, lockedAt]);

  useEffect(() => {
    // if (open) {
    //   setTimeout(() => {
    //     setStakingStatus("finish");
    //   }, 1000);
    // }
    if (!open) {
      setTimeout(() => {
        setStakingStatus("idle");
      }, 200);
    }
  }, [open]);

  return (
    <>
      {isStaked && !!lockedAt ? (
        <button className="h-9 rounded border border-[#9745FF] px-2 py-[6px] text-[13px] font-light">
          Unlock after {days}d, {hours}h, {minutes}m
        </button>
      ) : (
        <button
          style={{
            background: "linear-gradient(95deg, #9948FF 0%, #CF48FF 100%)",
          }}
          onClick={toggleOpen}
          className="flex h-9 w-[180px] items-center justify-center gap-[6px] rounded px-2 py-[6px] text-[13px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="16"
            fill="none"
            viewBox="0 0 17 16"
          >
            <g clipPath="url(#clip0_8116_4074)">
              <path
                stroke="#fff"
                strokeLinejoin="round"
                d="M2.5 2.75l6-1.753 5.998 1.75v3.59a8.771 8.771 0 01-6 8.32A8.778 8.778 0 012.493 6.33V2.737l.007.013z"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_8116_4074">
                <path
                  fill="#fff"
                  d="M0 0H16V16H0z"
                  transform="translate(.5)"
                ></path>
              </clipPath>
            </defs>
          </svg>
          Lock for 3 months
        </button>
      )}

      <ModalWrapper open={open} onClose={() => toggleOpen()}>
        <div className="relative flex min-h-[579px] w-screen max-w-[600px] flex-col overflow-hidden rounded-[20px] bg-gray2 p-9 text-white transition-all">
          {loading && (
            <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-black/50">
              <LoaderSpinner width={40} />
            </div>
          )}
          <div className="mb-1 flex h-5 justify-end">
            <button onClick={toggleOpen}>
              <XIcon className="w-3 text-white/50" />
            </button>
          </div>
          {stakingStatus === "idle" && (
            <StakingInfor loading={loading} onStake={run} nftName={nftName} />
          )}
          {stakingStatus === "finish" && (
            <FinishStaking closeModal={toggleOpen} nftName={nftName} />
          )}
        </div>
      </ModalWrapper>
    </>
  );
};

export default ModalStakingNFT;
