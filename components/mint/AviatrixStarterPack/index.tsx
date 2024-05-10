import AviatrixStarterForm from "./AviatrixStarterForm";
import MintPack from "./MintPack";

export default function AviatrixStarterPack() {
  return (
    <div className="flex flex-col gap-5 overflow-hidden px-5 font-aeonikPro font-normal text-white lg:flex-row xl:gap-10 xl:px-0">
      <div className="h-[400px] lg:h-[632px] w-full overflow-hidden lg:w-[560px] xl:w-[524px]">
        <MintPack />
      </div>
      <div className="flex-1">
        <AviatrixStarterForm />
      </div>
    </div>
  );
}
