import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { classNames } from "utils/string";

const SelectCollection = () => {
  let [plan, setPlan] = useState("startup");

  return (
    <RadioGroup className="mt-8" value={plan} onChange={setPlan}>
      <RadioGroup.Option value="startup">
        {({ checked }) => (
          <span
            className={classNames(
              "flex cursor-pointer items-center gap-3 rounded-xl p-5",
              checked ? "bg-gray2" : "text-white/50",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="22"
              fill="none"
              viewBox="0 0 18 22"
            >
              <path
                stroke="#76807D"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M16 1H2a1 1 0 00-1 1v18a1 1 0 001 1h14a1 1 0 001-1V2a1 1 0 00-1-1z"
              ></path>
              <path
                stroke="#76807D"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 8.5c1.1 0 2-.9 2-2a2 2 0 10-2 2z"
              ></path>
              <path
                stroke="#76807D"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 11.5a3 3 0 00-3-3c-1.66 0-3 1.34-3 3M6 14.5h6M6 17.5h3.5"
              ></path>
            </svg>
            All NFTs
          </span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="business">
        {({ checked }) => (
          <span
            className={classNames(
              "flex cursor-pointer items-center gap-3 rounded-xl p-5",
              checked ? "bg-gray2" : "text-white/50",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="#76807D"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17.5 1h-15A1.5 1.5 0 001 2.5v15A1.5 1.5 0 002.5 19h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0017.5 1z"
              ></path>
              <path
                stroke="#76807D"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.5 4.5h4v4h-4v-4z"
              ></path>
              <path
                stroke="#76807D"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M11.5 4.5h4M11.5 8h4M4.5 12h11M4.5 15.5h11"
              ></path>
            </svg>
            Chapter 1: Origin Of Planets
          </span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value="enterprise">
        {({ checked }) => (
          <span
            className={classNames(
              "flex cursor-pointer items-center gap-3 rounded-xl p-5",
              checked ? "bg-gray2" : "text-white/50",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="none"
              viewBox="0 0 22 22"
            >
              <path
                stroke="#76807D"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M1 4.955l10 3.54L21 4.95 11 1.49 1 4.945v.01z"
              ></path>
              <path
                stroke="#76807D"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M1 9l10 3.5L21 9M1 13l10 3.5L21 13M1 17l10 3.5L21 17"
              ></path>
            </svg>
            Falcon Force
          </span>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  );
};

export default SelectCollection;
