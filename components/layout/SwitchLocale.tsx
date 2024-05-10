import { Popover } from "@headlessui/react";
import { usePathname, useRouter } from "next-intl/client";

import { useScroll } from "ahooks";
import { PATH_HOME, SCROLL_HEIGH } from "constants/global";
import Image from "next/image";
import { useMemo } from "react";
import { classNames } from "utils/string";
import MultiLanguageIcon from "../shared/icons/multi-language";

const SwitchLocale = ({
  isMobileNav,
  iconProp = <MultiLanguageIcon />,
}: {
  isMobileNav?: boolean;
  iconProp?: React.ReactNode;
}) => {
  const scroll: any = useScroll();
  const pathname = usePathname();
  const router = useRouter();

  const handleSwitchLocale = (locale: string) =>
    router.replace(pathname, { locale });
  const isHomeScreen = useMemo(() => {
    if (isMobileNav) return "text-black dark:text-white";
    if (pathname === PATH_HOME) {
      if (scroll?.top >= SCROLL_HEIGH) return "text-black dark:text-white";
      return "text-white dark:text-white";
    } else return "text-black dark:text-white";
  }, [scroll, pathname]);
  return (
    <Popover className="relative h-6 w-6 ">
      <Popover.Button
        className={classNames(
          "m-0 h-full w-full border-0 p-0 text-white focus-visible:outline-none active:inset-0 active:outline-none",
        )}
      >
        {iconProp ? iconProp : <MultiLanguageIcon />}
      </Popover.Button>

      <Popover.Panel className="absolute right-0 z-10 ">
        <div className="relative mt-2 flex flex-col gap-2 rounded border border-black/10 bg-white px-2 py-2 text-black">
          <div
            className="flex cursor-pointer items-center justify-center gap-2 px-10"
            onClick={() => handleSwitchLocale("en")}
          >
            <Image
              src="/images/united-kingdom.png"
              width={20}
              height={20}
              alt="flag"
            />
            <p>EN</p>
          </div>
          <hr />
          <div
            className="flex cursor-pointer items-center justify-center gap-2 px-10"
            onClick={() => handleSwitchLocale("vn")}
          >
            <Image
              src="/images/vietnam.png"
              width={20}
              height={20}
              alt="flag"
            />
            <p>VN</p>
          </div>
          <div
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
            className="absolute -top-2 right-1 h-3 w-3 bg-white "
          ></div>
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default SwitchLocale;
