import Button from "@/components/shared/button";
import SpinnerIcon from "@/components/shared/icons/spinner";
import { toastError } from "@/lib/toastify";
import { useRequest } from "ahooks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setUpdatedAt } from "store/features/user/userSlice";

const GameAccessCode = () => {
  const dispatch = useDispatch();
  const { session } = useSelector((state: RootState) => state.user);
  const access_code = session?.user?.login_code;

  const handleIssueCode = async () => {
    const req = await fetch("/api/user/get-issued-code", {
      method: "GET",
    });
    if (req.ok && req.status === 200) {
      return true;
    }
    return false;
  };

  const { run, loading } = useRequest(handleIssueCode, {
    onSuccess: () => {
      dispatch(setUpdatedAt(Date.now()));
    },
    onError: (e) => {
      toastError("Something went wrong, please try again!");
    },
    manual: true,
  });

  return (
    <div className="mt-2">
      {!!session?.user?.username ? (
        (access_code && (
          <div>
            <p>Use {access_code} to Login to the Game Now</p>
            <div className="flex items-center gap-1">
              <p className="text-sm">Cannot access?</p>
              <button
                onClick={run}
                className="flex w-fit items-center gap-1 rounded text-[16px] text-fcon"
              >
                {loading && <SpinnerIcon className="h-5 w-5" />}
                <span>Generate new code</span>
              </button>
            </div>
          </div>
        )) || (
          <Button
          loading={loading}
            onClick={run}
            className="flex w-fit items-center gap-1 rounded px-3 py-1 text-[16px] text-black"
          >
            <span>Get your game access code</span>
          </Button>
        )
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default GameAccessCode;
