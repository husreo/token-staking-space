import ClockIcon from "@/components/shared/icons/clock";
import Translation from "utils/translation";
import BorderComing from "./BorderComing";
import GiftCard from "./GiftCard";

const dataGift = [
  {
    name: "Shopee",
    image: "/images/GiftCard/shopee.png",
  },
  {
    name: "Lazada",
    image: "/images/GiftCard/lazada.png",
  },
  {
    name: "Grab Food",
    image: "/images/GiftCard/grab-food.png",
  },
  {
    name: "Amazon",
    image: "/images/GiftCard/amazon.png",
  },
  {
    name: "Apple",
    image: "/images/GiftCard/apple.png",
  },
  {
    name: "7-Eleven",
    image: "/images/GiftCard/seven11.png",
  },
  {
    name: "Starbucks",
    image: "/images/GiftCard/starbucks.png",
  },
  {
    name: "PHUC LONG Coffee & Tea",
    image: "/images/GiftCard/phuclong.png",
  },
  {
    name: "PUBG Mobile UC International",
    image: "/images/GiftCard/katinat.png",
  },
];

export default function Gift() {
  return (
    <div className="col-span-12 rounded-2xl bg-[#1A1A1A] px-5 py-6 max-[414px]:px-2">
      <div className="flex items-center justify-between gap-2 max-sm:flex-col max-sm:text-center">
        <div>
          <h1 className="text-[28px] font-bold tracking-[-0.84px]">
            <Translation text="dashboard.redeem.title-gift-card" />
          </h1>

          <p className="text-gray6">
            <Translation text="dashboard.redeem.description" />
          </p>
        </div>
        <div className="flex h-[58px] w-[152px] justify-end">
          <div className="relative flex h-full w-[142px] flex-col items-center justify-center gap-x-[6px] rounded-[10px] border-transparent bg-[#2D3130] px-3 py-[7px] md:h-[58px] md:flex-row ">
            <ClockIcon strokeColor="#fff" className="h-5 w-5" />
            <span className="z-10 -mb-1 text-[14px] font-normal">
              <Translation text="dashboard.redeem.coming" />
            </span>
            <BorderComing className="absolute bottom-0 left-0 right-0 top-0 w-full" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-x-6 pt-6 xl:justify-start">
        {dataGift.map((item) => {
          return (
            <div key={item.name}>
              <GiftCard {...item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
