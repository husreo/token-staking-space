import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

export const locales = ["en", "vn"];
const protectedPages = [
  "/me",
  // "/dashboard",
  // "/leaderboard",
  "/account-setting",
];
const publicPages = [
  "/",
  "/login",
  "/forgot-password",
  "/privacy-policy",
  "/terms-of-use",
  "/branding-kit",
  "/dashboard",
  "/leaderboard",
  "/new-user",
  "/stats",
  "/stake"
];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/login",
    },
  },
);

export default function middleware(req: NextRequest) {
  const customLocales = [...locales, ""];
  const publicPathnameRegex = RegExp(
    `^(/(${customLocales.join("|")}))?(${publicPages.join("|")})?/?$`,
    "i",
  );
  const protectedPathnameRegex = RegExp(
    `^(/(${customLocales.join("|")}))?(${protectedPages.join("|")})?/?$`,
    "i",
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
  const isProtectedPage = protectedPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage || !isProtectedPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
