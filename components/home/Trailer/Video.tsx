"use client";

import PauseIcon from "@/components/shared/icons/pause";
import PlayIcon from "@/components/shared/icons/play";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import BGTrailer from "public/images/Trailer/bg-trailer.png";
import { useRef, useState } from "react";

export default function Video() {
  const [playing, setPlaying] = useState(false);
  const [showButtonPlay, setShowButtonPlay] = useState(true);
  const videoRef: any = useRef();
  const handlePausePlayVideo = () => {
    const video = videoRef.current;
    setPlaying(!playing);
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    if (!playing) {
      setShowButtonPlay(false);
    }
  };
  const handleMouseEnter = () => {
    if (playing) {
      setShowButtonPlay(true);
    }
  };
  const handleMouseLeave = () => {
    if (playing) {
      setShowButtonPlay(false);
    }
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex w-full items-center justify-center max-lg:aspect-video lg:h-[260px] lg:w-[453px]"
    >
      <Image
        className="absolute bottom-0 left-0 right-0 top-0 z-0 rounded-xl object-cover"
        src={BGTrailer}
        fill
        alt="BGTrailer"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <Transition
        show={showButtonPlay}
        enter="transition-opacity ease-linear duration-600"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute z-20 flex h-[110px] w-[110px] cursor-pointer  items-center justify-center rounded-[172px] bg-[#E2FF6C] p-9"
      >
        {" "}
        <div
          onClick={handlePausePlayVideo}
          className="absolute z-10 flex h-[110px] w-[110px] cursor-pointer  items-center justify-center rounded-[172px] bg-[#E2FF6C] p-9"
        >
          {playing ? (
            <PlayIcon className="h-[38px] w-[38px] text-black opacity-80" />
          ) : (
            <PauseIcon className="h-[38px] w-[38px]" />
          )}
        </div>
      </Transition>
      <video
        ref={videoRef}
        className="absolute z-10 h-full w-full rounded-xl object-cover"
        loop
        muted
        preload="true"
      >
        <source
          src="https://storage.googleapis.com/sf_1st_collection/webassets/Beta%20Gameplay%20short.mov"
          type="video/mp4"
        />
      </video>
    </div>
  );
}
