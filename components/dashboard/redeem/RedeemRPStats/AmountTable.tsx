import React from "react";
import { classNames } from "utils/string";
import Badge from "public/images/FalconBadge/reward-point1.png";

import Image from "next/image";
interface DataType {
  dateTime: string;
  redeemType: string;
  amount: string;
}
interface IProp {
  data: DataType[];
}

const TableCell = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={classNames(
        "h-full pl-2 pr-[10px] pt-[11px] font-medium sm:pl-6",
        className,
      )}
    >
      {children}
    </div>
  );
};
export default function AmountTable({ data }: IProp) {
  return (
    <div className="h-full max-h-[230px] w-full flex-1 flex-col overflow-x-auto overflow-y-scroll rounded-[10px] border border-[#2D3130] bg-transparent">
      <table className="h-full w-full">
        <thead>
          <tr className=" h-10 w-full items-center pt-2 text-left text-base font-medium text-[#76807D]">
            <th className="truncate pl-2 sm:pl-6 lg:w-[217px]">Date & time</th>
            <th className="truncate pl-2 sm:pl-6 lg:w-[180px]">Redeem Type</th>
            <th className="truncate pl-2 sm:pl-6">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={`row${index}`} className="h-10 text-base font-medium">
                <td>
                  <TableCell>{item.dateTime}</TableCell>
                </td>
                <td>
                  <TableCell>{item.redeemType}</TableCell>
                </td>
                <td>
                  <TableCell className="flex gap-x-2">
                    <span className="relative h-5 w-5">
                      <Image
                        className="object-cover"
                        src={Badge}
                        fill
                        alt="logo"
                        sizes="(max-width: 600px) 100vw, 100vw"
                      />
                    </span>
                    <span className="-mt-[1px] h-5 font-dinPro text-[15px] font-bold">
                      {item.amount}
                    </span>
                  </TableCell>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
