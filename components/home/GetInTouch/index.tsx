import Button from "@/components/shared/button/ButtonCustom";
import TextInputCustom from "@/components/shared/input/TextInputCustom";
import { NavLink } from "@/components/shared/string";
import Translation from "utils/translation";
import ComponentContainer from "../../shared/container/ComponentContainer";

export default function GetInTouch() {
  return (
    <ComponentContainer className="px-5">
      <div className="pb-2 pt-9 lg:pt-64">
        <div className="my-1 text-3xl text-black dark:text-white md:text-[40px]">
          <Translation sub="join-readers" text="title" />
        </div>
        <div className="text-[15px] font-normal text-[#757575]">
          <Translation sub="join-readers" text="content" />{" "}
          <NavLink className="text-lightGreen" href="/privacy-policy">
            <Translation sub="join-readers" text="privacy-policy" />
          </NavLink>
        </div>
      </div>
      <div className="relative mt-9 flex h-12 w-fit items-center gap-5 rounded-[100px] bg-background3 p-1 dark:bg-gray2 sm:gap-0">
        <TextInputCustom placeholder="name@example.com" />
        <Button
          className="h-full w-[120px] px-4 text-xs font-normal sm:w-auto sm:flex-1 sm:text-base"
          variant="green"
        >
          <Translation text="button.submit" />
        </Button>
      </div>
    </ComponentContainer>
  );
}
