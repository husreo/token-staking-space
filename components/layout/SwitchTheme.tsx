"use client";
import { useScroll } from "ahooks";
import { PATH_HOME, SCROLL_HEIGH } from "constants/global";
import { usePathname } from "next-intl/client";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { classNames } from "utils/string";
import MoonIcon from "../shared/icons/moon";
import SunIcon from "../shared/icons/sun";

const SwitchTheme = ({ isMobileNav }: { isMobileNav?: boolean }) => {
  const scroll: any = useScroll();
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const handleSwitchTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else setTheme("dark");
  };
  const isHomeScreen = useMemo(() => {
    if (isMobileNav) return "text-black dark:text-white";
    if (pathname === PATH_HOME) {
      if (scroll?.top >= SCROLL_HEIGH) return "text-black dark:text-white";
      return "text-white dark:text-white";
    } else return "text-black dark:text-white";
  }, [scroll, pathname]);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <button
      onClick={handleSwitchTheme}
      className={classNames("relative h-6 w-6 text-white")}
    >
      <SunIcon
        className={classNames(
          "absolute bottom-0 left-0 right-0 top-0",
          theme === "dark" ? "opacity-0" : "opacity-100",
        )}
      />

      <MoonIcon
        className={classNames(
          "absolute bottom-0 left-0 right-0 top-0",
          theme === "light" ? "opacity-0" : "opacity-100",
        )}
      />
    </button>
  );
};

export default SwitchTheme;
