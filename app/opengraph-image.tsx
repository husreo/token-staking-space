/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";

export const runtime = "edge";
export const alt = "Space Falcon - Building blocks for your Next.js project";
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <img
          src={new URL(
            "../public/opengraph-image.png",
            import.meta.url,
          ).toString()}
          alt="Space Falcon Logo"
          tw="w-full h-full"
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
