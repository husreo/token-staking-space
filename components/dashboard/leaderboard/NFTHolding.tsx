import Image from "next/image";

const NFTHolding = (p: {
  collectionName: string;
  lockAmount: number;
  notLockAmount: number;
  collectionImage: string;
}) => {
  const { collectionName, lockAmount, notLockAmount, collectionImage } = p;
  return (
    <div className="flex h-12 overflow-hidden rounded border border-white/[0.12] bg-gray1">
      <div className="relative">
        <div className="relative z-30 min-w-[76px] py-2 pl-3">
          <p className="text-left text-[11px] font-medium text-gray7">
            {collectionName}
          </p>
          <p className="z-30 text-left font-medium leading-4 text-white">
            {notLockAmount}
          </p>
        </div>
        <Image
          src={collectionImage}
          alt=""
          className="absolute bottom-0 left-0 top-0 z-10 object-cover"
          width={48}
          height={48}
        />
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(16, 17, 17, 0.41) 0%, #101111 100%)",
          }}
          className="absolute bottom-0 left-0 top-0 z-20 h-12 w-12"
        ></div>
      </div>
      {/* locked planets */}
      <div
        style={{
          background: "linear-gradient(95deg, #9948FF 0%, #6D48FF 100%)",
        }}
        className="relative flex min-w-[100px] items-center gap-2 rounded p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fff"
            fillOpacity="0.85"
            d="M11.268 22c4.882 0 8.136-3.301 8.136-8.275C19.404 5.449 12.36 2 7.467 2c-.869 0-1.424.305-1.424.897 0 .231.102.471.296.693 1.1 1.313 2.201 2.876 2.22 4.698 0 .416-.047.785-.343 1.303L8.68 9.5c-.416-1.36-1.535-2.321-2.515-2.321-.38 0-.638.277-.638.693 0 .24.064.805.064 1.212 0 2.071-1.59 3.282-1.59 6.62C4 19.485 6.894 22 11.268 22zm.212-2.598c-1.729 0-2.875-1.045-2.875-2.599 0-1.627 1.156-2.21 1.303-3.254.019-.083.074-.111.14-.056.425.38.702.842.933 1.378.49-.666.721-2.071.564-3.588-.01-.083.046-.129.13-.101 2.024.952 3.079 2.968 3.079 4.77 0 1.832-1.073 3.45-3.274 3.45z"
          ></path>
        </svg>
        <div>
          <p className="text-[11px] font-medium">Locked</p>
          <p className="text-left leading-[14px]">{lockAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default NFTHolding;
