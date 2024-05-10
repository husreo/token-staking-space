import React from "react";
export default function LoadingTable() {
  return (
    <div>
      <table className="w-full animate-pulse table-fixed rounded-2xl">
        <thead>
          <tr className="h-16">
            <th className="sticky w-[80px]"></th>
            <th className="sticky w-72"></th>
            <th className="sticky w-[350px]"></th>
            <th className="sticky w-60"></th>
            <th className="sticky px-3 pr-5 text-right"></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }, (_, index) => {
            return (
              <tr
                key={`row${index + 1}`}
                className="h-16 border-b border-white/[0.09] font-aeonikPro font-medium last:border-b-0"
              >
                <td className="pl-5">
                  <div className="h-2 rounded-full bg-gray-500 opacity-50"></div>
                </td>
                <td>
                  <div className="ml-5 flex items-center gap-x-2 px-2 lg:px-0">
                    <div className="relative h-12 w-12 rounded-full bg-gray-500 opacity-50"></div>
                    <div className="h-2 w-1/2 rounded-full bg-gray-500 opacity-50"></div>
                  </div>
                </td>
                <td>
                  <div className="flex gap-x-1 px-2 lg:px-0">
                    <div className="flex h-full w-[90px] flex-row items-center gap-x-[6px] rounded-lg bg-gray2 p-1">
                      <div className="relative h-8 w-8 rounded-full bg-gray-500 px-2 opacity-50"></div>
                      <div className="-mb-1 h-2 rounded-full bg-gray-500 opacity-50"></div>
                    </div>
                    <div className="flex h-full w-[90px] flex-row items-center gap-x-[6px] rounded-lg bg-gray2 p-1">
                      <div className="relative h-8 w-8 rounded-full bg-gray-500 px-2 opacity-50"></div>
                      <div className="-mb-1 h-2 rounded-full bg-gray-500 font-medium opacity-50"></div>
                    </div>
                    <div className="flex h-full w-[90px] flex-row items-center gap-x-[6px] rounded-lg bg-gray2 p-1">
                      <div className="relative h-8 w-8 rounded-full bg-gray-500 px-2 opacity-50"></div>

                      <div className="-mb-1 h-2 rounded-full bg-gray-500 font-medium opacity-50"></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-x-2 px-5">
                    <div className="relative h-5 w-5 rounded-full bg-gray-500 opacity-50"></div>
                    <div className="h-2 w-1/2 rounded-full bg-gray-500 opacity-50"></div>
                  </div>
                </td>
                <td>
                  <div className="flex h-2 justify-end gap-x-2 rounded-full bg-gray-500 pr-5 opacity-50"></div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
