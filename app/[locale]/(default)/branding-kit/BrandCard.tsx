import { DownloadIconGreen } from "@/components/shared/icons";
import React from "react";

interface IProps {
  logo: JSX.Element;
  srcSVG: string;
  srcPNG: string;
  srcPNG3x: string;
  fileName: string;
}
const BrandCard: React.FC<IProps> = ({
  logo,
  srcSVG,
  srcPNG,
  fileName,
  srcPNG3x,
}: IProps) => {
  return (
    <div className="flex h-[270px] flex-col">
      <div
        className={`h-[240px] flex-1 rounded-tl-md rounded-tr-md border-border1 bg-[#0F0F0F]`}
      >
        <div className="relative flex h-full flex-col items-center justify-center">
          {logo}
        </div>
      </div>
      <div className="flex h-10 items-center justify-center gap-x-6 rounded-bl rounded-br bg-gray4 text-white">
        {srcSVG && (
          <a
            className="flex gap-x-1 transition-all duration-100 ease-in hover:text-fcon"
            href={srcSVG}
            download={fileName}
          >
            <DownloadIconGreen className="w-4" />
            <span className="text-xs">SVG</span>
          </a>
        )}
        <a
          className="flex gap-x-1 transition-all duration-100 ease-in hover:text-fcon"
          href={srcPNG}
          download={fileName}
        >
          <DownloadIconGreen className="w-4" />
          <span className="text-xs">PNG</span>
        </a>
        {srcPNG3x && (
          <a
            className="flex gap-x-1 transition-all duration-100 ease-in hover:text-fcon"
            href={srcPNG3x}
            download={fileName}
          >
            <DownloadIconGreen className="w-4" />
            <span className="text-xs">PNG-3x</span>
          </a>
        )}
      </div>
    </div>
  );
};
export default BrandCard;
