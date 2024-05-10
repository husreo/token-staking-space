import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  setClickStep,
  setShowNDModalBurnNFT,
  setShowNDModalLoginCode,
} from "store/features/newDashboard/newDashboardSlice";

interface IStepByStepProps {
  step: string;
  title: string;
  description: string;
  btnText: string;
  btnFn: () => void;
}

const StepItem: React.FC<IStepByStepProps> = (props) => {
  const { step, title, description, btnText, btnFn } = props;
  return (
    <div className="flex min-h-[282px] flex-col justify-between p-9 [&:not(:last-child)]:border-r [&:not(:last-child)]:border-white/[0.15]">
      <div>
        <div className="inline-block border border-fcon bg-[#00ffc24c] p-2 text-sm uppercase">
          {step}
        </div>
        <div className="my-2 text-[24px] font-semibold uppercase leading-[32px]">
          {title}
        </div>
        <div className="text-sm uppercase">{description}</div>
      </div>
      <div
        onClick={btnFn}
        className="flex h-[50px] cursor-pointer select-none items-center justify-center border border-white/[0.15]
        bg-white/[0.1] text-center hover:bg-white/[0.15]"
      >
        {btnText}
      </div>
    </div>
  );
};

export default function StepByStep() {
  const dispatch = useDispatch();
  const { push } = useRouter();

  const handleMintNow = () => {
    dispatch(setClickStep("1"));
    setTimeout(() => {
      dispatch(setClickStep(""));
    }, 600);
  };

  const handleBurnNft = () => {
    dispatch(setShowNDModalBurnNFT(true));
  };

  const handleGetLoginCode = () => {
    dispatch(setShowNDModalLoginCode(true));
  };

  const handlePlay = () => {
    push("/#download-to-play");
  };

  return (
    <div className="grid w-full grid-cols-1 gap-[1px] border-l border-r border-white/[0.15] md:grid-cols-2 lg:grid-cols-4">
      <StepItem
        step="STEP 1"
        title="MINT"
        description="MINT YOUR AVIATRIX PASS"
        btnText="MINT NOW"
        btnFn={handleMintNow}
      />
      <StepItem
        step="STEP 2"
        title="BURN YOUR NFT"
        description="BURN TO GET YOUR AVIATRIX PASS"
        btnText="BURN NFT"
        btnFn={handleBurnNft}
      />
      <StepItem
        step="STEP 3"
        title="GET LOGIN CODE"
        description="AFTER YOUR NFT IS CONSUMED, YOU GET 3 LOGIN CODES"
        btnText="GET LOGIN CODE"
        btnFn={handleGetLoginCode}
      />
      <StepItem
        step="STEP 4"
        title="PLAY TO WIN"
        description="ALL PLAYERS GET FCON AIRDROPPED, TOP PLAYERS GET MORE"
        btnText="PLAY"
        btnFn={handlePlay}
      />
    </div>
  );
}
