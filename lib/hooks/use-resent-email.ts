import { useRequest } from "ahooks";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { sleep } from "utils/promise";
import { toastSuccess } from "../toastify";

const useResentEmail = () => {
  const [isResent, setResentStatus] = useState<"init" | "sent" | "error">(
    "init",
  );
  const [resentAt, setResentAt] = useState<Dayjs | undefined>();

  const resetResentStatus = () => setResentStatus("init");

  const handleResentEmail = async () => {
    const response = await fetch("/api/user/verify-again", {
      method: "POST",
    });
    await sleep(1000);
    if (!response.ok) {
      throw new Error("API request failed");
    }
    const data = await response.json();
    return data;
  };

  const { loading, run: resentEmail } = useRequest(handleResentEmail, {
    manual: true,
    debounceWait: 150,
    onError: (e) => {
      setResentStatus("error");
    },
    onSuccess: () => {
      toastSuccess(
        "Request success, please check your inbox to complete verification process!",
      );
      setResentStatus("sent");
      setResentAt(dayjs().add(3, "days"));
      localStorage.setItem(
        "resend",
        dayjs().add(3, "days").valueOf().toString(),
      );
    },
    onBefore: () => setResentStatus("init"),
    throttleWait: 60000,
  });

  useEffect(() => {
    const timeResent = localStorage.getItem("resend");
    if (!!timeResent && !dayjs().isAfter(dayjs(Number(timeResent)))) {
      setResentAt(dayjs(Number(timeResent)));
      setResentStatus("sent");
    } else {
      setResentAt(undefined);
      localStorage.removeItem("resend");
    }
    return () => {
      setResentAt(undefined);
    };
  }, []);

  return {
    resentEmail,
    loading,
    isResent,
    resentAt,
    resetResentStatus,
  };
};

export default useResentEmail;
