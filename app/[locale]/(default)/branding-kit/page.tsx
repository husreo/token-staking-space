import React from "react";
import BrandCard from "./BrandCard";
import Brand1 from "public/images/BrandingKit/brand-1.svg";
import BrandImages1 from "public/images/BrandingKit/brand-1-img.png";
import Brand1_3x from "public/images/BrandingKit/brand-1-3x.png";

import Brand2 from "public/images/BrandingKit/brand-2.svg";
import BrandImages2 from "public/images/BrandingKit/brand-2-img.png";
import Brand2_3x from "public/images/BrandingKit/brand-2-3x.png";

import Brand3 from "public/images/BrandingKit/branding-img-1.png";
import Brand3_3x from "public/images/BrandingKit/branding-img-1-3x.png";

import Brand4 from "public/images/BrandingKit/branding-img-2.png";
import Brand4_3x from "public/images/BrandingKit/branding-img-2-3x.png";

import Brand5 from "public/images/BrandingKit/branding-img-3.png";
import Brand5_3x from "public/images/BrandingKit/branding-img-3-3x.png";

import Brand6 from "public/images/BrandingKit/branding-img-4.png";
import Brand6_3x from "public/images/BrandingKit/branding-img-4-3x.png";

import Brand7 from "public/images/BrandingKit/brand-3.svg";
import BrandImages7 from "public/images/BrandingKit/brand-3-img.png";
import Brand7_3x from "public/images/BrandingKit/brand-3-3x.png";

import Brand8 from "public/images/BrandingKit/brand-4.svg";
import BrandImages8 from "public/images/BrandingKit/brand-4-img.png";
import Brand8_3x from "public/images/BrandingKit/brand-4-3x.png";

import Brand9 from "public/images/BrandingKit/brand-5.svg";
import BrandImages9 from "public/images/BrandingKit/brand-5-img.png";
import Brand9_3x from "public/images/BrandingKit/brand-5-3x.png";

import Brand10 from "public/images/BrandingKit/brand-6.svg";
import BrandImages10 from "public/images/BrandingKit/brand-6-img.png";
import Brand10_3x from "public/images/BrandingKit/brand-6-3x.png";

import Brand11 from "public/images/BrandingKit/brand-7.svg";
import BrandImages11 from "public/images/BrandingKit/brand-7-img.png";
import Brand11_3x from "public/images/BrandingKit/brand-7-3x.png";

import BrandImages12 from "public/images/BrandingKit/branding-img-5.png";
import BrandImages12_3x from "public/images/BrandingKit/branding-img-5-3x.png";

import BrandImages13 from "public/images/BrandingKit/branding-img-6.png";
import BrandImages13_3x from "public/images/BrandingKit/branding-img-6-3x.png";

import BrandImages14 from "public/images/BrandingKit/branding-img-7.png";
import BrandImages14_3x from "public/images/BrandingKit/branding-img-7-3x.png";

import BrandImages15 from "public/images/BrandingKit/branding-img-8.png";
import BrandImages15_3x from "public/images/BrandingKit/branding-img-8-3x.png";

import AviatrixImage1 from "public/images/BrandingKit/aviatrix-logo.png";
import AviatrixImage2 from "public/images/BrandingKit/aviatrix-logo-2.png";
import AviatrixImage3 from "public/images/BrandingKit/aviatrix-logo-3.png";

import Image from "next/image";

const brandingKit = [
  {
    logo: <Image src={Brand1} alt="" key={"brandingIcon1"} />,
    srcSVG: Brand1.src,
    srcPNG: BrandImages1.src,
    srcPNG3x: Brand1_3x.src,
    fileName: "fcon-logo-1",
  },
  {
    logo: <Image src={Brand2} alt="" key={"brandingIcon2"} />,
    srcSVG: Brand2.src,
    srcPNG: BrandImages2.src,
    srcPNG3x: Brand2_3x.src,
    fileName: "fcon-logo-2",
  },
  {
    logo: (
      <Image
        src={Brand3}
        className="rounded-tl rounded-tr object-cover"
        fill
        alt=""
        key={"brandingIcon3"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
      />
    ),
    srcSVG: "",
    srcPNG: Brand3.src,
    srcPNG3x: Brand3_3x.src,
    fileName: "fcon-logo-3",
  },
  {
    logo: (
      <Image
        src={Brand4}
        className="rounded-tl rounded-tr object-cover"
        fill
        alt=""
        key={"brandingIcon4"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
      />
    ),
    srcPNG: Brand4.src,
    srcSVG: "",
    srcPNG3x: Brand4_3x.src,
    fileName: "fcon-logo-4",
  },
  {
    logo: (
      <Image
        src={Brand5}
        className="rounded-tl rounded-tr object-cover"
        fill
        alt=""
        key={"brandingIcon5"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
      />
    ),
    srcSVG: "",
    srcPNG: Brand5.src,
    srcPNG3x: Brand5_3x.src,
    fileName: "fcon-logo-5",
  },
  {
    logo: (
      <Image
        src={Brand6}
        className="rounded-tl rounded-tr object-cover"
        fill
        alt=""
        key={"brandingIcon6"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
      />
    ),
    srcSVG: "",
    srcPNG: Brand6.src,
    srcPNG3x: Brand6_3x.src,
    fileName: "fcon-logo-6",
  },
  {
    logo: <Image src={Brand7} alt="" key={"brandingIcon7"} />,
    srcSVG: Brand7.src,
    srcPNG: BrandImages7.src,
    srcPNG3x: Brand7_3x.src,
    fileName: "fcon-logo-7",
  },
  {
    logo: <Image src={Brand8} alt="" key={"brandingIcon8"} />,
    srcSVG: Brand8.src,
    srcPNG: BrandImages8.src,
    srcPNG3x: Brand8_3x.src,
    fileName: "fcon-logo-8",
  },
  {
    logo: <Image src={Brand9} alt="" key={"brandingIcon9"} />,
    srcSVG: Brand9.src,
    srcPNG: BrandImages9.src,
    srcPNG3x: Brand9_3x.src,
    fileName: "fcon-logo-9",
  },
  {
    logo: <Image src={Brand10} alt="" key={"brandingIcon10"} />,
    srcSVG: Brand10.src,
    srcPNG: BrandImages10.src,
    srcPNG3x: Brand10_3x.src,
    fileName: "fcon-logo-10",
  },
  {
    logo: <Image src={Brand11} alt="" key={"brandingIcon11"} />,
    srcSVG: Brand11.src,
    srcPNG: BrandImages11.src,
    srcPNG3x: Brand11_3x.src,
    fileName: "fcon-logo-11",
  },
  {
    logo: (
      <Image
        src={BrandImages12_3x.src}
        className="rounded-tl rounded-tr object-cover"
        fill
        alt=""
        key={"BrandImages12"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
      />
    ),
    srcSVG: "",
    srcPNG: BrandImages12.src,
    srcPNG3x: "",
    fileName: "spacefalcon-poster-1",
  },
  {
    logo: (
      <Image
        src={BrandImages13_3x.src}
        className="rounded-tl rounded-tr object-cover"
        fill
        alt=""
        key={"BrandImages13"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
      />
    ),
    srcSVG: "",
    srcPNG: BrandImages13.src,
    srcPNG3x: "",
    fileName: "spacefalcon-poster-2",
  },
  {
    logo: (
      <Image
        src={BrandImages14_3x.src}
        className="rounded-tl rounded-tr object-contain"
        fill
        alt=""
        key={"BrandImages14"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
      />
    ),
    srcSVG: "",
    srcPNG: BrandImages14.src,
    srcPNG3x: "",
    fileName: "spacefalcon-poster-3",
  },
  {
    logo: (
      <Image
        src={BrandImages15_3x.src}
        className="rounded-tl rounded-tr object-contain"
        fill
        alt=""
        key={"BrandImages15"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
      />
    ),
    srcSVG: "",
    srcPNG: BrandImages15.src,
    srcPNG3x: "",
    fileName: "spacefalcon-poster-4",
  },
  {
    logo: (
      <Image
        src={AviatrixImage1}
        className="object-cover"
        fill
        alt=""
        key={"AviatrixImage1"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
      />
    ),
    srcSVG: "",
    srcPNG: AviatrixImage1.src,
    srcPNG3x: "",
    fileName: "Aviatrix Poster",
  },
  {
    logo: (
      <Image
        src={AviatrixImage3}
        className="object-cover"
        fill
        alt=""
        key={"AviatrixImage3"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
      />
    ),
    srcSVG: "",
    srcPNG: AviatrixImage3.src,
    srcPNG3x: "",
    fileName: "Aviatrix Poster",
  },
  {
    logo: (
      <Image
        src={AviatrixImage2}
        className="object-contain"
        fill
        alt=""
        key={"AviatrixImage2"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
      />
    ),
    srcSVG: "",
    srcPNG: AviatrixImage2.src,
    srcPNG3x: "",
    fileName: "Aviatrix Poster",
  },
];

export default function BrandingKit() {
  return (
    <div className="px-4 pb-48 pt-64 max-[580px]:pt-80 md:pt-56">
      <div className="grid h-auto grid-flow-row grid-cols-12 gap-3 gap-y-3">
        {brandingKit.map((item) => {
          return (
            <div
              key={item.logo.key}
              className="col-span-full h-fit w-full md:col-span-6 lg:col-span-4 xl:col-span-3"
            >
              <BrandCard
                logo={item.logo}
                srcSVG={item.srcSVG}
                srcPNG={item.srcPNG}
                fileName={item.fileName}
                srcPNG3x={item.srcPNG3x}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
