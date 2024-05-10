import React from "react";

export default function LoadingTable() {
  return (
    <table className="relative w-full min-w-[700px] table-fixed animate-pulse overflow-x-auto max-[700px]:max-w-[700px]">
      <thead>
        <tr className="sticky top-0 z-10 h-16 bg-gray0 py-[21px] pl-9 pr-20 ">
          <th className="truncate pl-9 opacity-60"></th>
          <th className="truncate opacity-60"></th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 10 }, (_, index) => {
          return (
            <tr
              key={`row-stats-${index}`}
              className="h-16 border-b border-white/[0.09] py-[21px]"
            >
              <td>
                <div className="flex h-2 w-1/2 items-center gap-2 rounded-full bg-gray-500 pl-9 opacity-50"></div>
              </td>
              <td>
                <div className="flex h-2 w-1/2 items-center gap-2 rounded-full bg-gray-500 pl-9 opacity-50"></div>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr
          key={"footer"}
          className="sticky bottom-0 h-16 bg-[#151817] py-[21px]"
        >
          <td>
            <div className="flex h-2 w-1/2 items-center gap-2 rounded-full bg-gray-500 pl-9 opacity-50"></div>
          </td>
          <td>
            <div className="flex h-2 w-1/2 items-center gap-2 rounded-full bg-gray-500 pl-9 opacity-50"></div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
