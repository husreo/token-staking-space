"use client";
import React, { useState } from "react";
import { classNames } from "utils/string";
type Props = {
  label?: string;
  inputClassname?: string;
  isIcon?: boolean;
  labelStyle?: string;
  styleValidate?: "default" | "success" | "error" | "normal";
} & React.InputHTMLAttributes<HTMLInputElement>;

// eslint-disable-next-line react/display-name
const TextInput: React.FC<Props> = React.forwardRef(
  (
    {
      label,
      name,
      inputClassname = "",
      type = "text",
      isIcon = true,
      labelStyle = "",
      styleValidate = "default",
      disabled,
      ...rest
    },
    ref,
  ) => {
    const [inputType, setInputType] = useState(type);
    return (
      <div
        className={classNames(
          "duration-50 rounded-lg border px-4 py-2 shadow-sm transition-all ease-in ",
          inputClassname,
          disabled ? "opacity-80" : "",
          // isDarkMode
          //   ? " border-black/10  dark:border-white/10 dark:text-white/30 dark:focus-within:text-white"
          //   : " text-black/30 focus-within:text-black",
          // styleValidate === "success"
          //   ? "border-[#06826B] bg-background-success text-black/30 focus-within:border-[#06826B] focus-within:text-black"
          //   : styleValidate === "error"
          //   ? "border-red-500 bg-background-error text-black/30 focus-within:border-red-500 focus-within:text-black"
          //   : styleValidate === "normal"
          //   ? "border-white/10 text-white focus-within:text-white"
          //   : "border-black/10 bg-transparent text-black/30 focus-within:border-black focus-within:text-black",
        )}
      >
        {label && (
          <label
            htmlFor={name}
            className={`block ${
              labelStyle ? labelStyle : "text-xs font-medium text-gray6"
            }`}
          >
            {label}
          </label>
        )}
        <div className="group flex w-full items-center">
          <input
            type={inputType}
            name={name}
            className={`block w-full border-0 bg-transparent p-0 placeholder:text-gray6 focus:ring-0 sm:text-sm sm:leading-6 `}
            disabled={disabled}
            {...rest}
            //@ts-ignore
            ref={ref}
          />
          <div>
            {type === "password" ? (
              inputType === "text" ? (
                <button type="button" onClick={() => setInputType("password")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </button>
              ) : (
                <button type="button" onClick={() => setInputType("text")}>
                  {isIcon && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      ></path>
                    </svg>
                  )}
                </button>
              )
            ) : null}
          </div>
        </div>
      </div>
    );
  },
);

export default TextInput;
