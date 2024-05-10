import Button from "@/components/shared/button";
import ComponentContainer from "@/components/shared/container/ComponentContainer";
import Translation from "utils/translation";
import HomeSubTitle from "../SubTitle";
import HomeTitle from "../Title";

const YoutubeVideo = () => {
  return (
    <div className="bg-black py-20 lg:py-40 xl:py-48">
      <ComponentContainer className="px-5 lg:px-0">
        <div className="block gap-[68px] px-4 sm:flex xl:px-0 ">
          <div className="flex w-full flex-col justify-center text-center sm:w-[488px] sm:text-left">
            <HomeTitle className="mb-8 text-white">
              <Translation text="home.videos.title" />
            </HomeTitle>
            <HomeSubTitle className="text-left text-white">
              <Translation text="home.videos.description" />
            </HomeSubTitle>
          </div>
          <div
            className="w-full max-w-[646px] rounded-lg"
            style={{ boxShadow: "0px 4px 60px 0px rgba(0, 0, 0, 0.00)" }}
          >
            <iframe
              className="mx-auto h-[364px] w-full max-w-[646px] rounded-lg"
              src="https://www.youtube-nocookie.com/embed/KCnvCh2HvuI?si=MTZU-IhG5C9tcCvB&amp;controls=0"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <div className="mx-auto mt-5 flex max-w-[646px] flex-wrap items-center justify-between gap-3 rounded-lg bg-[#181818] px-6 py-[18px] dark:border-white/10 dark:bg-[#181818]">
              <p className="text-[17px] text-white dark:text-white">
                <Translation text="home.videos.watch-more" />
              </p>
              {/* <Link
                href="https://www.youtube.com/@Space_Falcon"
                target="_blank"
                className="border-none"
              > */}
              <Button
                variant="error"
                className="rounded px-3 py-2 font-medium text-white dark:text-white"
              >
                <Translation text="button.channel" />
              </Button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </ComponentContainer>
    </div>
  );
};

export default YoutubeVideo;
