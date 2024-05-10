import Image from "next/image";
import Translation from "utils/translation";
import ComponentContainer from "../../shared/container/ComponentContainer";

export default function Blog() {
  return (
    <div className="bg-white py-16 dark:bg-gray1 lg:py-24">
      <ComponentContainer className="mt-0 px-5 2xl:px-0">
        <div className="items-center justify-center text-center">
          <div className="font-normal">
            <p className="text-3xl text-black dark:text-white md:text-[40px]">
              <Translation sub="blog" text="title" />
            </p>
          </div>
          <div className="mt-0 font-normal sm:mt-14">
            <div className="block grid-cols-2 gap-5 lg:grid">
              <div className="relative mb-1 h-auto cursor-pointer">
                <div className="relative col-span-1 h-[130px] sm:h-[334px] lg:mb-0">
                  <Image
                    className="rounded object-contain sm:object-cover"
                    src="/images/GalaxyPilots/Header.png"
                    fill
                    alt="fcon-blog-1"
                    sizes="(max-width: 600px) 100vw, 100vw"
                  />
                </div>
                <div className="mb-6 mt-0 text-center sm:mt-3 lg:text-left">
                  <div className="text-sm  tracking-tight text-black dark:text-white md:text-xl">
                    Creating the Success Story for the Future of Gaming
                  </div>
                  <div className="text-xs text-[#7C7C7C] dark:text-white md:text-[13px]">
                    Aug 15, 2023
                  </div>
                </div>
              </div>
              <div className="col-span-1 ">
                <div className="mb-4 grid cursor-pointer grid-cols-2 gap-5">
                  <div className="relative col-span-1 h-[160px]">
                    <Image
                      className="rounded object-cover"
                      src="/images/Blog/blog2.png"
                      fill
                      alt="fcon-blog-2"
                      sizes="(max-width: 600px) 100vw, 100vw"
                    />
                  </div>
                  <div className="col-span-1 flex flex-col justify-center text-left ">
                    <div className="text-xs text-[#7C7C7C] dark:text-white md:text-[13px]">
                      Aug 15, 2023
                    </div>
                    <div className="text-sm  text-black dark:text-white md:text-xl">
                      Falcon Points Explained
                    </div>
                  </div>
                </div>
                <div className="mb-6 grid cursor-pointer grid-cols-2 gap-5">
                  <div className="relative  col-span-1 h-[160px]">
                    {" "}
                    <Image
                      className="rounded object-cover"
                      src="/images/Blog/blog3.png"
                      fill
                      alt="fcon-blog-3"
                      sizes="(max-width: 600px) 100vw, 100vw"
                    />
                  </div>
                  <div className="col-span-1 flex flex-col justify-center text-left">
                    <div className="text-xs text-[#7C7C7C] dark:text-white md:text-[13px]">
                      Aug 15, 2023
                    </div>
                    <div className="text-sm  text-black dark:text-white md:text-xl">
                      Reward Points Explained
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="block grid-cols-2 gap-5 lg:grid">
              <div className="col-span-1 cursor-pointer">
                <div className="mb-4 grid grid-cols-2 gap-5 lg:mb-0">
                  <div className="relative  col-span-1 h-[160px]">
                    {" "}
                    <Image
                      className="rounded object-cover"
                      src="/images/Blog/blog4.png"
                      fill
                      alt="fcon-blog-4"
                      sizes="(max-width: 600px) 100vw, 100vw"
                    />
                  </div>
                  <div className="col-span-1 flex flex-col justify-center text-left">
                    <div className="text-xs text-[#7C7C7C] dark:text-white md:text-[13px]">
                      Aug 15, 2023
                    </div>
                    <div className="text-sm  text-black dark:text-white md:text-xl">
                      Introducing Multi-chain NFTs
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-1 cursor-pointer">
                <div className="grid grid-cols-2 gap-5 ">
                  <div className="relative  col-span-1 h-[160px]">
                    {" "}
                    <Image
                      className="rounded object-cover"
                      src="/images/Blog/blog5.png"
                      fill
                      alt="fcon-blog-5"
                      sizes="(max-width: 600px) 100vw, 100vw"
                    />
                  </div>
                  <div className="col-span-1 flex flex-col justify-center text-left">
                    <div className="text-xs text-[#7C7C7C] dark:text-white md:text-[13px]">
                      Aug 15, 2023
                    </div>
                    <div className="text-sm  text-black dark:text-white md:text-xl">
                      Exclusive Tournaments and Events
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex  justify-center text-center">
            <button className="mt-14 flex h-12 items-center justify-center rounded border border-gray-200 px-[11px] py-[19px] dark:border-white/10">
              <Translation text="button.more-news" />
            </button>
          </div>
        </div>
      </ComponentContainer>
    </div>
  );
}
