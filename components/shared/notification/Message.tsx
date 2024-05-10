import React from "react";
import XCircleIcon from "../icons/x-circle";
import CheckIcon from "../icons/check-icon";
interface IProps {
  text: string;
  status: "error" | "success";
}

export default function Message({ text = "Error", status = "error" }: IProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-x-2 overflow-hidden md:w-fit md:flex-row">
      {status === "error" && (
        <div className="relative h-5 w-5 md:w-6">
          <XCircleIcon className="h-5 w-5 font-bold text-error" />
        </div>
      )}
      {status === "success" && (
        <div className="relative h-5 w-5 md:w-6">
          <CheckIcon className="h-5 w-5 font-bold text-green-500" />
        </div>
      )}
      <span className="-mb-1 w-full text-center font-aeonikPro font-bold">
        {text}
      </span>
    </div>
  );
}
