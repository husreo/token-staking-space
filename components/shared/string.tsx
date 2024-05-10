"use client";

import Link from "next-intl/link";
import { LinkProps } from "next/link";
import { HTMLProps } from "react";

type Props = {
  children: React.ReactNode;
  href: string;
  className?: string;
} & LinkProps &
  HTMLProps<HTMLAnchorElement>;

export const NavLink: React.FC<Props> = ({
  as,
  children,
  href,
  replace,
  scroll,
  shallow,
  passHref,
  className = "",
  ref,
  target,
  ...rest
}) => {
  return (
    <Link
      as={as}
      href={href}
      passHref={passHref}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      className={className}
      target={target}
    >
      {children}
    </Link>
  );
};
