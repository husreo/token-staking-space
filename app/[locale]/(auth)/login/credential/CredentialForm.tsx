"use client";

import Button from "@/components/shared/button";
import TextInput from "@/components/shared/input/TextInput";
import { useRequest } from "ahooks";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Translation from "utils/translation";
import OtherSignIn from "../../OtherSignIn";

const CredentialForm = () => {
  const { get } = useSearchParams();

  const router = useRouter();
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    values: {
      username: "",
      password: "",
    },
  });

  const submitForm = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const req = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (req?.error) {
      setError("root", {
        type: "failed_credentials",
      });
    } else {
      const callback = get("callbackUrl");
      const callbackUrl = callback ? `${callback}` : "/dashboard";
      router.push(callbackUrl);
    }
  };

  const { runAsync, loading } = useRequest(submitForm, {
    manual: true,
  });

  return (
    <div className="w-full pb-2">
      <form onSubmit={handleSubmit(runAsync)}>
        <TextInput
          inputClassname="rounded-[8px] mb-1 h-14 flex items-center text-black"
          placeholder={t("sign-in.space-id")}
          {...register("username", {
            required: true,
          })}
          autoComplete="new-password"
        />
        {errors?.username && (
          <p className="mb-3 mt-3 text-center text-[13px] text-[#FF634E]">
            <Translation text={`errors.${errors.username.type}`} />
          </p>
        )}
        <div className="mb-3"></div>
        <TextInput
          inputClassname="rounded-[8px] mb-1 h-14 flex items-center text-black"
          placeholder={t("sign-in.password")}
          isIcon={false}
          type="password"
          {...register("password", {
            required: true,
          })}
          autoComplete="new-password"
        />
        {errors?.password && (
          <p className="mb-3 mt-3 text-center text-[13px] text-[#FF634E]">
            <Translation text={`errors.${errors.password.type}`} />
          </p>
        )}
        {errors?.root && (
          <p className="mb-3 text-center text-[13px] text-red-500">
            <Translation text={`errors.${errors.root.type}`} />
          </p>
        )}
        <OtherSignIn />
        <div className="mb-10"></div>
        <div className="flex flex-col gap-1">
          <Button
            loading={loading}
            type="submit"
            className="h-10 w-full rounded-[1000px] font-aeonikPro font-medium text-gray0"
          >
            <div className="flex items-center justify-center gap-1 font-aeonikPro text-gray0">
              {/* {loading && <SpinnerIcon className="h-4 w-4" />} */}
              <Translation text="button.continue" />
            </div>
          </Button>
          <Link
            className="w-full rounded-[1000px] px-6 py-2 text-center font-normal text-gray0"
            href={"/forgot-password"}
          >
            <Translation text="nav.forgot-password" />
          </Link>
        </div>
      </form>
      <div className="mt-4 flex w-full flex-wrap justify-center text-center text-base font-normal">
        <span className="w-fit text-gray0 ">
          <Translation text="sign-in.no-account" />
        </span>
        &nbsp;
        <Link href="/new-user" className="w-fit font-aeonikPro text-lightGreen">
          <Translation text="sign-in.create" />
        </Link>
      </div>
    </div>
  );
};

export default CredentialForm;
