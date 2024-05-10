import { SOCIAL_LINK } from "constants/global";
import Link from "next/link";
import { Fragment } from "react";

import DiscordIcon from "../../shared/icons/brand/discord/discord";
import TelegramIcon from "../../shared/icons/brand/telegram/telegram";
import TwitterIcon from "../../shared/icons/brand/twitter/twitter";

export default function SocialLink () {
  return (
    <Fragment>
      <div className="flex items-center gap-12">
        <Link href={SOCIAL_LINK.TWITTER} target="_blank">
          <TwitterIcon className="h-6 w-[25px] text-white" />
        </Link>
        <Link target="_blank" href={SOCIAL_LINK.DISCORD}>
          <DiscordIcon className="h-6 w-6 text-white" />
        </Link>
        {/* <Link href={SOCIAL_LINK.YOUTUBE} target="_blank">
          <YoutubeCircle className="h-8 w-8" />
        </Link> */}

        <Link
          href={SOCIAL_LINK.TELEGRAM}
          target="_blank"
          className="backdrop-grayscale"
        >
          <TelegramIcon className="h-6 w-6 text-white" />
        </Link>
      </div>
    </Fragment>
  )
}