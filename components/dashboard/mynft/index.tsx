import Button from "@/components/shared/button";
import NFTManagement from "./NFTManagement";
import UserStats from "./UserStats";
import ModalTransferToInventory from "./NFTManagement/ModalTransferToInventory";
import FCON from "../fcon";
import EarningStats from "./NFTManagement/EarningStats";

const PremiumContent = () => {
  return (
    <div className="pt-32 text-center">
      <svg
        className="mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="72px"
        height="72px"
      >
        <path
          d="M 16 3 C 12.15625 3 9 6.15625 9 10 L 9 13 L 6 13 L 6 29 L 26 29 L 26 13 L 23 13 L 23 10 C 23 6.15625 19.84375 3 16 3 Z M 16 5 C 18.753906 5 21 7.246094 21 10 L 21 13 L 11 13 L 11 10 C 11 7.246094 13.246094 5 16 5 Z M 8 15 L 24 15 L 24 27 L 8 27 Z"
          fill="white"
        />
      </svg>
      <div
        className={
          "my-6 text-4xl font-bold leading-[48px] text-white md:text-5xl lg:text-5xl lg:leading-[64px]"
        }
      >
        Unlock with <h1 className={"text-[#01FFC2]"}>Aviatrix Starter Pack</h1>
      </div>
      <Button
        variant="gradient"
        className="mt-3 rounded-[10px] px-6 py-3 text-black"
      >
        Coming Soon
      </Button>
    </div>
  );
};

const MyNFT = () => {
  return (
    <div>
      {/* <FCON /> */}
      <EarningStats />
      <NFTManagement />
      <ModalTransferToInventory />
    </div>
  );
};

export default MyNFT;
