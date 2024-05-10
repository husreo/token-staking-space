"use client";

import Button from "@/components/shared/button";
import TextInput from "@/components/shared/input/TextInput";
import Message from "@/components/shared/notification/Message";
import { useRequest } from "ahooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Translation from "utils/translation";

const ResetPasswordForm = () => {
  const t = useTranslations();
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    reset,
  } = useForm({
    values: {
      password: "",
      confirmPassword: "",
      currentPassword: "",
    },
  });

  const submitForm = async ({
    password,
    confirmPassword,
    currentPassword,
  }: {
    password: string;
    confirmPassword: string;
    currentPassword: string;
  }) => {
    try {
      const url = "/api/user/change-password";
      const req = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_password: password,
          old_password: currentPassword,
        }),
      });
      const data = await req.json();
      if (req.status === 200) {
        setSuccess(true);
        reset();
        return data;
      } else if (data.message == "old_password_mismatch") {
        setError("currentPassword", {
          type: "mismatchPassword",
        });
        return;
      } else if (
        data.message == "new_password_cannot_be_the_same_as_your_old_password"
      ) {
        setError("currentPassword", {
          type: "errorChangePassword",
        });
        return;
      } else if (data.message == "invalid password") {
        setError("currentPassword", {
          type: "invalidPassword",
        });
        setError("password", {
          type: "invalidPassword",
        });
        setError("confirmPassword", {
          type: "invalidPassword",
        });
        return;
      }
      return null;
    } catch (error) {
      throw new Error("API request failed");
    }
  };
  const { runAsync, loading } = useRequest(submitForm, {
    manual: true,
  });
  const handleChangeMessage = () => {
    setSuccess(false);
  };

  return (
    <form
      onSubmit={handleSubmit(runAsync)}
      className="rounded-[20px] bg-gray2 p-5 sm:p-12"
    >
      <h2 className="mb-3 text-2xl font-bold text-white">
        {" "}
        <Translation text="account-setting.form-password.title" />
      </h2>
      <p className="mb-9 font-aeonikPro text-base text-gray7">
        <Translation text="account-setting.form-password.attention" />
      </p>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 border-white/10">
          <TextInput
            styleValidate="normal"
            type="password"
            onInput={() => handleChangeMessage()}
            inputClassname="!p-[14px] text-white border border-white/10"
            placeholder={t("account-setting.form-password.current-password")}
            {...register("currentPassword", {
              required: true,
              validate: {
                invalidPassword: (e) =>
                  /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-\s]+$/g.test(
                    e.toString(), //Allow input of everything, including spaces, except for emojis.
                  ),
                shouldNotContainSpace: (e) => !/.*\s+.*/.test(e),
                minFiveCharacters: (e) => e.toString().length >= 5,
              },
            })}
          />
          {errors?.currentPassword?.type && (
            <p className="mt-1 px-2 text-[13px] font-medium text-error">
              <Translation
                text={`error-messages.${errors?.currentPassword?.type}`}
              />
            </p>
          )}
        </div>
        <div className="dark col-span-6 flex-1 border-white/10 md:col-span-3">
          <TextInput
            styleValidate="normal"
            type="password"
            onInput={() => handleChangeMessage()}
            inputClassname="!p-[14px] text-white"
            placeholder={t("account-setting.form-password.new-password")}
            {...register("password", {
              required: true,
              validate: {
                invalidPassword: (e) =>
                  /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-\s]+$/g.test(
                    e.toString(),
                  ),
                shouldNotContainSpace: (e) => !/.*\s+.*/.test(e),
                minFiveCharacters: (e) => e.toString().length >= 5,
                // passwordsMatch: (value) => value === watch("confirmPassword"),
              },
            })}
          />
          {errors?.password?.type && (
            <p className="mt-1 px-2 text-[13px] font-medium text-error">
              <Translation text={`error-messages.${errors?.password?.type}`} />
            </p>
          )}
        </div>
        <div className="dark col-span-6 flex-1 border-white/10 md:col-span-3">
          <TextInput
            styleValidate="normal"
            type="password"
            onInput={() => handleChangeMessage()}
            inputClassname="!p-[14px] text-white"
            placeholder={t("account-setting.form-password.re-enter-new-password")}
            {...register("confirmPassword", {
              required: true,
              validate: {
                invalidPassword: (e) =>
                  /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-\s]+$/g.test(
                    e.toString(),
                  ),
                minFiveCharacters: (e) => e.toString().length >= 5,
                passwordsMatch: (value) => value === watch("password"),
              },
            })}
          />
          {errors?.confirmPassword?.type && (
            <p className="mt-1 px-2 text-[13px] font-medium text-error">
              <Translation
                text={`error-messages.${errors?.confirmPassword?.type}`}
              />
            </p>
          )}
        </div>
        {success && Object.keys(errors).length === 0 && (
          <div className="col-span-6 col-start-1 flex justify-center px-5 py-3 !text-gray6 md:col-span-3">
            <Message status="success" text="Successfully!" />
          </div>
        )}
        <Button
          loading={loading}
          variant="muted"
          className="col-span-6 col-start-1 rounded-3xl px-5 py-3 !text-gray6 hover:!text-black md:col-span-3 md:col-start-4"
        >
          <Translation text="button.save-change" />
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
