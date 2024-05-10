"use client";

import Button from "@/components/shared/button";
import BellIcon from "@/components/shared/icons/bell";
import TextInput from "@/components/shared/input/TextInput";
import { toastError, toastSuccess } from "@/lib/toastify";
import { useRequest } from "ahooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Translation from "utils/translation";

const ChangeUsername = () => {
  const t = useTranslations();
  const tranlate = (text: string) => t(`account-setting.form-nickname.${text}`);
  const { session } = useSelector((state: RootState) => state.user);
  const [inputValue, setInputValue] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    values: {
      username: session?.user?.username || "",
    },
  });

  const submitForm = async ({ username }: { username: string }) => {
    try {
      const url = "/api/user/change-username";
      const req = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
        }),
      });

      const data = await req.json();
      if (data.data.username && data.data.username == username.trim()) {
        toastSuccess("Changed username successfully!");
        return data;
      } else if (data.error && data.data.message == "REQUEST_INVALID") {
        setError("username", {
          type: "limitTimeToChange",
        });
        return;
      } else if (
        data.error &&
        data.data.message &&
        data.data.message.includes("duplicate")
      ) {
        setError("username", {
          type: "usernameExisted",
        });
        return;
      } else if (
        Array.isArray(data.data.username) &&
        data.data.username[0] === "Same username"
      ) {
        setError("username", {
          type: "sameCurrentUsername",
        });
        return;
      }

      return null;
    } catch (error) {
      toastError("request failed");
    }
  };
  const { runAsync, loading } = useRequest(submitForm, {
    manual: true,
  });

  const handleBlockKey = (event: any) => {
    if (event.key === " " || event.keyCode === 32) {
      event.preventDefault();
    }
  };
  const handlePaste = (event: any) => {
    event.preventDefault();
    const pasteData = (event.clipboardData || window.Clipboard).getData("text");
    const validDataRegex = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/g;
    if (validDataRegex.test(pasteData)) {
      setValue("username", pasteData);
    } else {
      // setError("username", {
      //   type: "requiredPaste",
      // });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(runAsync)}
      className="rounded-[20px] bg-gray2 p-5 sm:p-12"
    >
      <h2 className="mb-3 text-2xl font-bold text-white">
        {tranlate("title")}
      </h2>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 border-white/10">
          <TextInput
            styleValidate="normal"
            type="text"
            onKeyDown={handleBlockKey}
            onPaste={handlePaste}
            disabled={session?.user?.hasOwnProperty("username") ? false : true}
            label={tranlate("label")}
            inputClassname="!p-[14px] text-white border border-white/10"
            placeholder={tranlate("placeholder")}
            {...register("username", {
              required: true,
              validate: {
                noEmojiAndJustLatinCharacters: (e) =>
                  /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-\s]+$/g.test(
                    e.toString(), //Allow input of everything, including spaces, except for emojis.
                  ),
                noWhitespace: (e) => !/\s/.test(e),
                // notOnlyWhitespace: (e) => e.trim().length > 0,
                minLengthCharacters: (e) => e.toString().length >= 8,
                maxLengthCharacters: (e) => e.toString().length <= 64,
                atLeastOneLetter: (e) => /[a-zA-Z]/.test(e),
                atLeastOneNumber: (e) => /\d/.test(e),
                atLeastOneSpecialCharacter: (e) =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(e),
              },
            })}
          />

          {errors?.username?.type && (
            <p className="mt-1 px-2 text-[13px] font-medium text-error">
              <Translation text={`error-messages.${errors?.username?.type}`} />
            </p>
          )}
          <div className="mt-3 flex items-center gap-3">
            <BellIcon className="h-6 w-6" />
            <p className="flex-1 font-aeonikPro text-base text-gray7">
              {tranlate("description")}
            </p>
          </div>
        </div>
        <Button
          loading={loading}
          disabled={session?.user?.hasOwnProperty("username") ? false : true}
          // disabled
          variant={Object.keys(errors).length ? "muted" : "default"}
          className="col-span-6 col-start-1 rounded-3xl px-5 py-3 !text-black md:col-span-3 md:col-start-4"
        >
          <Translation text="button.save-change" />
        </Button>
      </div>
    </form>
  );
};

export default ChangeUsername;
