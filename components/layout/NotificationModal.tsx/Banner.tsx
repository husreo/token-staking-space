import Marquee from "react-fast-marquee";

const BannerText = ({ text = "" }: { text: string }) => {
  return (
    <div className="ml-[30px] font-chakraPetch text-sm font-bold uppercase leading-6 text-white">
      {text}
    </div>
  );
};
export default function Banner() {
  return (
    <div className="fixed left-0 right-0 top-0">
      <Marquee
        speed={50}
        className="flex h-[52px] items-center overflow-hidden bg-[#9254DE] py-3"
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="flex items-center gap-[31px]">
            <BannerText text="AIRDROP" />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
