import { IBM_Plex_Sans, Inter, Chakra_Petch } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400"],
});

export const chakraPetch = Chakra_Petch({
  variable: "--font-chakraPetch",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const DINPro = localFont({
  variable: "--font-DINPro",
  preload: true,
  src: [
    {
      path: "./DINPro/DINPRO.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

export const aeonikPro = localFont({
  variable: "--font-aeonikPro",
  preload: true,
  src: [
    {
      path: "./aeonik/AeonikPro-Air.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./aeonik/AeonikPro-Thin.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./aeonik/AeonikPro-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./aeonik/AeonikPro-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./aeonik/AeonikPro-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./aeonik/AeonikPro-Bold.otf",
      weight: "600 800",
      style: "normal",
    },
    {
      path: "./aeonik/AeonikPro-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
});
export const aeonikMono = localFont({
  variable: "--font-aeonikMono",
  src: [
    {
      path: "./aeonikMono/AeonikMono-Air.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./aeonikMono/AeonikMono-Thin.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./aeonikMono/AeonikMono-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./aeonikMono/AeonikMono-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./aeonikMono/AeonikMono-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./aeonikMono/AeonikMono-Bold.otf",
      weight: "600 800",
      style: "normal",
    },
    {
      path: "./aeonikMono/AeonikMono-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
});
export const mouchaVintage = localFont({
  variable: "--font-mouchaVintage",
  src: [
    {
      path: "./mouchaVintage/MouchaVintage-Ultra.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./mouchaVintage/MouchaVintage-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./mouchaVintage/MouchaVintage-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./mouchaVintage/MouchaVintage-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./mouchaVintage/MouchaVintage-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./mouchaVintage/MouchaVintage-Bold.ttf",
      weight: "600 800",
      style: "normal",
    },
    {
      path: "./mouchaVintage/MouchaVintage-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});
