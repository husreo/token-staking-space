import { useSelector } from "react-redux";
import { RootState } from "store";
import { shortAddress } from "utils/string";
import LoginButton from "../LoginButton";
import NavAccountDropdown from "./NavAccountDropdown";

export default function NavUser() {
  const { session } = useSelector((state: RootState) => state.user);
  return (
    <div className="hidden h-full items-center sm:flex">
      {!!session?.access_token ? (
        <div className="relative flex h-full items-center border-l border-white/[0.15] px-[30px]">
          <NavAccountDropdown
            username={shortAddress(session?.user?.username) || ""}
          />
        </div>
      ) : (
        <div className="h-full w-[200px]">
          <LoginButton shouldLoginAfterConnect />
        </div>
      )}
    </div>
  );
}
