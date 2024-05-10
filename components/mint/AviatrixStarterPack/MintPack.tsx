import Image from "next/image";
import MintPackage2 from "public/images/Aviarix/mint-package-2.png";
import MintPackage3 from "public/images/Aviarix/mint-package-3.png";
import MintPackage4 from "public/images/Aviarix/mint-package-4.png";
import MintPackage5 from "public/images/Aviarix/mint-package-5.png";

export default function MintPack() {
  return (
    <div className="grid h-full grid-cols-7 grid-rows-6 gap-4">
      <div className="relative col-span-4 row-span-3 row-start-1 flex flex-col">
        <Image
          fill
          className="rounded-xl object-cover"
          src={MintPackage2}
          alt="mint"
          sizes="(max-width: 600px) 100vw, 100vw"
        />
      </div>
      <div className="relative col-span-4 row-span-3 row-start-4 flex flex-col">
        <Image
          className="rounded-xl object-cover"
          src={MintPackage4}
          fill
          alt="mint"
          sizes="(max-width: 600px) 100vw, 100vw"
        />
      </div>
      <div className="relative col-span-3 row-span-2 row-start-1 gap-4">
        <Image
          fill
          className="rounded-xl object-cover"
          src={MintPackage3}
          alt="mint"
          sizes="(max-width: 600px) 100vw, 100vw"
        />
      </div>
      <div className="relative col-span-3 row-span-2 row-start-3">
        <Image
          fill
          className="rounded-xl object-cover"
          src={MintPackage4}
          alt="mint"
          sizes="(max-width: 600px) 100vw, 100vw"
        />
      </div>
      <div className="relative col-span-3 row-span-2 row-start-5">
        <Image
          fill
          className="rounded-xl object-cover"
          src={MintPackage5}
          alt="mint"
          sizes="(max-width: 600px) 100vw, 100vw"
        />
      </div>
    </div>
  );
}
