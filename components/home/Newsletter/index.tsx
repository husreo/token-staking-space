import Button from "@/components/shared/button";
import TextInput from "@/components/shared/input/TextInputCustom";
import Image from "next/image";
import Link from "next/link";
import Translation from "utils/translation";

const Newsletter = () => {
  return (
    <div className="grid h-[302px] grid-cols-12 grid-rows-1 overflow-hidden rounded-lg bg-white dark:bg-gray2">
      <div className="relative z-20 col-start-1 col-end-13 row-span-full flex flex-col justify-center gap-4 bg-white/70 p-5 dark:bg-gray2/40 md:p-8 lg:col-end-8 lg:bg-transparent lg:p-12 lg:dark:bg-transparent">
        <div
          style={{
            clipPath: "polygon(0 0, 100% 0%, 90% 100%, 0% 100%)",
          }}
          className="absolute bottom-0 left-0 right-0 top-0  bg-white opacity-0 dark:bg-gray2 lg:opacity-100"
        ></div>
        <p className="z-20 text-xl font-medium tracking-[-0.2px] text-black dark:text-white">
          <Translation text="blog.news-letter" />
        </p>
        <p className="z-20  w-full text-[15px] font-normal tracking-[-0.15px] text-[#2D3130] dark:text-white/80">
          <Translation text="blog.subscribe" />
        </p>
        <div className="relative  z-20 flex h-12 w-full items-center rounded-[100px] bg-background3 p-1 dark:bg-gray3 sm:w-[388px]">
          <TextInput
            placeholder="name@example.com"
            inputClassname="shadow-none h-full flex-1"
          />
          <Button
            className="h-full w-[120px] px-5 text-xs font-normal sm:w-auto sm:text-base"
            variant="green"
          >
            <Translation text="button.submit" />
          </Button>
        </div>
        <p className="z-20 pt-2 text-xs  text-black dark:text-white">
          <Translation text="notices.privacy-accept" />{" "}
          <Link className="text-lightGreen" href="/privacy-policy">
            <Translation text="notices.privacy" />{" "}
          </Link>{" "}
          <Translation text="notices.and" />{" "}
          <Link className="text-lightGreen" href="/terms-of-use">
            <Translation text="notices.term-of-use" />{" "}
          </Link>
        </p>
      </div>
      <div className="relative col-start-1 col-end-13 row-span-full lg:col-start-7">
        <Image
          src="/images/newsletter.png"
          fill
          alt=""
          className="origin-right scale-150 object-cover max-sm:hidden sm:scale-[none]"
          sizes="(max-width: 600px) 100vw, 100vw"
        />
      </div>
    </div>
  );
};

export default Newsletter;
