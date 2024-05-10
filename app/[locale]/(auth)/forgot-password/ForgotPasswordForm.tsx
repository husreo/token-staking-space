"use client";

import Button from "@/components/shared/button";
import TextInput from "@/components/shared/input/TextInput";
import { useRequest } from "ahooks";
import Link from "next/link";
import { useState } from "react"; // New import for state handling
import { useForm } from "react-hook-form";
import Translation from "utils/translation";

const ForgotPasswordForm = () => {
  const [success, setSuccess] = useState(false); // New state for tracking request success

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    values: {
      email: "",
    },
  });

  const submitForm = async ({ email }: { email: string }) => {
    const req = await fetch("/api/user/reset-password", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await req.json();
    if (req.status === 200) {
      setSuccess(true); // Setting the success state to true when req.status is 200
      return data;
    } else if (data.message == "user_not_found") {
      setError("email", {
        type: "emailNotFound",
      });
      return;
    }
    return null;
  };

  const { runAsync, loading } = useRequest(submitForm, {
    manual: true,
  });

  if (success) {
    // Display the success message if the request was successful
    return (
      <>
        <p className="mb-3 text-[16px] text-black">
          <Translation text={`notices.password-sent-email`} />
        </p>
        <Link href={"/login/"}>
          <Button
            variant="green"
            type="submit"
            className="mt-3 w-full rounded-[1000px] px-6 py-3"
          >
            <Translation text="nav.back-to-login" />
          </Button>
        </Link>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit(runAsync)} className="w-full">
      <TextInput
        inputClassname="rounded-[8px] mb-1 text-black"
        label="Email"
        {...register("email", {
          required: true,
          validate: {
            invalidEmail: (v) =>
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
          },
        })}
      />
      {errors?.email && (
        <p className="mb-3 text-[13px] text-red-500">
          <Translation text={`errors.${errors.email.type}`} />
        </p>
      )}
      {errors?.root && (
        <p className="mb-3 text-center text-[13px] text-red-500">
          <Translation text={`errors.${errors.root.type}`} />
        </p>
      )}
      <div className="mb-10"></div>
      <Button
        loading={loading}
        type="submit"
        className="w-full rounded-[1000px] px-6 py-3 text-black"
      >
        <Translation text="button.send-new-password" />
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
