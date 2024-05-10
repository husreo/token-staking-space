import Image from "next/image";
import Translation from "utils/translation";

const UtilitiesItem = ({
  title,
  img,
  hideLive,
}: {
  title: React.ReactNode;
  img: string;
  hideLive?: boolean;
}) => (
  <div className="flex items-center gap-4 rounded-[12px] bg-white/[0.08] p-5">
    <div className="relative h-[56px] w-[56px] basis-[56px] overflow-hidden rounded-[10px]">
      <Image src={img} alt="" fill sizes="(max-width: 600px) 100vw, 100vw"/>
    </div>
    <div className="flex-1">
      {!hideLive && (
        <div className="flex items-center gap-1 text-sm uppercase">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <rect
                width="12"
                height="12"
                rx="6"
                fill="#24BE3D"
                fillOpacity="0.24"
              />
              <circle cx="6" cy="6" r="3" fill="#52FF6E" />
            </svg>
          </div>
          <div className="opacity-60">Live</div>
        </div>
      )}
      <div className="pr-3 text-[17px] leading-[19.55px]">{title}</div>
    </div>
  </div>
);

const PresaleUtilities = () => {
  return (
    <div className="container relative mx-auto px-3 font-aeonikPro text-white md:px-0">
      <div className="flex justify-center">
        <svg
          width="420"
          height="109"
          viewBox="0 0 420 109"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 108L175.807 10.1417C197.051 -1.75108 222.949 -1.75107 244.193 10.1417L419 108"
            stroke="url(#paint0_linear_8300_992)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_8300_992"
              x1="210"
              y1="108"
              x2="210"
              y2="-9"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4965F7" stopOpacity="0" />
              <stop offset="1" stopColor="#999DFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="-mt-[80px]">
        <div className="text-center text-[80px] font-light">Utilities</div>
      </div>
      <div className="mt-0 grid grid-cols-1 gap-6 md:-mt-[80px] md:grid-cols-3">
        <UtilitiesItem
          title={<Translation text="presale.entry-to-tournament" />}
          img="/images/Presale/presale-utilities-1.png"
        />
        <div className="hidden md:block">&nbsp;</div>
        <UtilitiesItem
          title={<Translation text="presale.special-bonus" />}
          img="/images/Presale/presale-utilities-2.png"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">
        <UtilitiesItem
          title="Staking"
          img="/images/Presale/presale-utilities-3.png"
        />
        <UtilitiesItem
          title="Farming"
          img="/images/Presale/presale-utilities-4.png"
        />
        <UtilitiesItem
          title={<Translation text="presale.pack-opening" />}
          img="/images/Presale/presale-utilities-5.png"
        />
        <UtilitiesItem
          title={<Translation text="presale.early-bonus" />}
          img="/images/Presale/presale-utilities-6.png"
          hideLive
        />
      </div>
    </div>
  );
};

export default PresaleUtilities;
