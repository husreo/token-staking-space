import Button from "@/components/shared/button";
import { useRequest } from "ahooks";
import { useState } from "react";
import { sleep } from "utils/promise";
import Translation from "utils/translation";

const NeedConfirmation = () => {
  const [isResent, setResentStatus] = useState<"init" | "sent" | "error">(
    "init",
  );
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
    onSuccess: () => setResentStatus("sent"),
    onBefore: () => setResentStatus("init"),
  });

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="mb-10 text-black dark:text-white">
        <Translation text="notices.notice-confirm-email" />
      </h1>
      <p className="text-sm text-gray7">
        <Translation text="notices.missing-email" />
      </p>
      {(isResent === "init" || isResent === "error") && (
        <Button
          loading={loading}
          onClick={resentEmail}
          className="rounded px-3 py-2"
        >
          <Translation text="button.send-email" />
        </Button>
      )}
      {isResent === "sent" && (
        <p className="text-black dark:text-white">
          <Translation text="notices.just-sent-email" />
        </p>
      )}
      {isResent === "error" && (
        <p className="text-red-500">
          <Translation text="errors.unknown-error" />
        </p>
      )}
    </div>
  );
};

export default NeedConfirmation;
