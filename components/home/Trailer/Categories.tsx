import Link from "next/link";
import React from "react";
import Translation from "utils/translation";

const dataCategories = [
  {
    title: <Translation text="home.trailer.about" />,
    href: "https://spacefalcon.substack.com/",
  },
  {
    title: <Translation text="home.trailer.economy" />,
    href: "https://spacefalcon.substack.com/",
  },
  {
    title: <Translation text="home.trailer.aviatrix-tournament" />,
    href: "https://spacefalcon.substack.com/",
  },
  {
    title: <Translation text="home.trailer.iphone" />,
    href: "https://spacefalcon.substack.com/",
  },
  {
    title: <Translation text="nav.FAQ" />,
    href: "https://spacefalcon.substack.com/",
  },
];
export default function Categories() {
  return (
    <div className="mt-5 flex flex-wrap text-center text-cenFter items-center justify-center gap-x-4 gap-y-2 font-aeonikPro sm:justify-start lg:mt-0">
      {dataCategories.map((item, index) => {
        const isLastItem = index === dataCategories.length - 1;
        return (
          <Link
            className="flex items-center gap-x-4"
            href={item.href}
            target="_blank"
            key={`categories${index}`}
          >
            <span className="uppercase tracking-[-0.15px] text-shadow-3">
              {item.title}
            </span>
            {!isLastItem && (
              <div className="h-[5px] w-[1px] bg-white/[0.17]"></div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
