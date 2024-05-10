import ProgressBarContext from "@/components/layout/ProgressBarContext";
import "@rainbow-me/rainbowkit/styles.css";
import cx from "classnames";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import Script from "next/script";
import {
  DINPro,
  aeonikMono,
  aeonikPro,
  chakraPetch,
  ibmPlexSans,
  inter,
  mouchaVintage,
} from "../fonts";
import "../globals.css";
import { NextAuthProvider } from "./(default)/providers";
import { ThemeProviders } from "./provider";
import {NextUIProvider} from "@nextui-org/react";
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "vn" }];
}

export const metadata: Metadata = {
  title: "Space Falcon",
  description:
    "Space Falcon is a gaming studio & tech startup scaling the Web3 gaming experience and revolutionising virtual adventures with GameFi initiatives.",
  twitter: {
    images: ["https://spacefalcon.com/opengraph-image.png"],
    card: "summary_large_image",
    title: "Space Falcon - Unlock Your Gaming Potential",
    description:
      "Space Falcon is a gaming studio & tech startup scaling the Web3 gaming experience and revolutionising virtual adventures with GameFi initiatives.",
  },
  themeColor: "#FFF",
  metadataBase: new URL("https://spacefalcon.com"),
  openGraph: {
    images: "/opengraph-image.png",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  const { locale } = params;
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    // redirect("/en");
    console.log("error next-intl", error);
  }
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cx(
          inter.variable,
          aeonikPro.variable,
          ibmPlexSans.variable,
          DINPro.variable,
          aeonikMono.variable,
          mouchaVintage.variable,
          chakraPetch.variable,
        )}
      >
        {/* <Script src="https://tag.safary.club/stag.js?id=prd_ReGyZazOBQ" /> */}
        <Script src="https://accounts.google.com/gsi/client" async></Script>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RMKG8BQ6Y4"
        />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-RMKG8BQ6Y4');
        `}
        </Script>
        <Script id="metricool-spacefalcon" src="https://tracker.metricool.com/resources/be.js">{`
        beTracker.t({ hash: "487e0e0cd9ec070473b15ed1044e59f8" });
        `}</Script>

        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProviders>
            <NextAuthProvider>
              <ProgressBarContext>{children}</ProgressBarContext>
            </NextAuthProvider>
          </ThemeProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
