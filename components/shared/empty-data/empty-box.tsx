import React from "react";
import EmptyBoxIcon from "../icons/empty-box";

export default function EmptyBox({
  content = "no data",
}: {
  content?: string | React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col justify-center items-center">
      <EmptyBoxIcon className="ml-1 h-10 w-10" />
      <p className="text-center font-aeonikPro text-sm capitalize italic opacity-60">
        {content}
      </p>
    </div>
  );
}
