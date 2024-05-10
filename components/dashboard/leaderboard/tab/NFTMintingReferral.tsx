"use client";
import EmptyBox from "@/components/shared/empty-data/empty-box";
import React, { useEffect, useState } from "react";
import { classNames } from "utils/string";
import LoadingTable from "../LoadingTable";
import { shortAddress } from "utils/string";

interface ResultsReferral {
  rank: number;
  refers: number;
  username: string;
  wallet_address: string;
  fcon_airdrop: number;
  fp_reward: number;
}
interface ReferralProp {
  count: number;
  next: string;
  previous: string;
  results: ResultsReferral[];
}
export default function NFTMintingReferral() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataReferral, setDataReferral] = useState<ReferralProp>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const optionPageSize = [10, 20, 50, 100];

  const handleFetchData = async () => {
    try {
      setIsLoading(true);
      const req = await fetch(
        `/api/leaderboard/minting-referral?page=${page}&page_size=${pageSize}`,
        {
          next: {
            revalidate: 10000,
          },
        },
      );
      const data = await req.json();
      setDataReferral(data);
      setTotalPages(Math.ceil(data.count / pageSize));
      setIsLoading(false);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const handleChangePageSize = (event: any) => {
    setPage(1);
    setPageSize(Number(event.target.value));
  };
  useEffect(() => {
    handleFetchData();
  }, [page, pageSize]);

  const calculatePageNumbers = () => {
    const pages = [];
    const MAX_PAGE_NUMBERS_DISPLAYED = 5; // check max page number if you want to display
    const pagesBeforeCurrentPage = 2;
    const startPage = Math.max(page - pagesBeforeCurrentPage, 1);
    const endPage = Math.min(
      startPage + MAX_PAGE_NUMBERS_DISPLAYED - 1,
      totalPages,
    );

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = calculatePageNumbers();
  return (
    <div className="w-full">
      <div className="border-l border-r border-white/[0.08] pt-10 ">
        <h1 className="p-9 text-2xl font-semibold tracking-[-0.96px] sm:text-5xl">
          REFERRAL
        </h1>
      </div>
      <div className="h-fit max-h-[600px] w-full max-w-[1656px] overflow-scroll bg-transparent">
        {isLoading ? (
          <LoadingTable />
        ) : (
          <>
            <table className="w-full border-b border-l border-r border-white/[0.08]">
              <thead>
                <tr className="border-left sticky left-0 right-0 top-0 h-12 border-b border-r border-white/[0.08] bg-white/[0.08] text-left text-sm font-medium uppercase leading-[18px] backdrop-blur-3xl">
                  <th
                    className="w-[200px] truncate pl-9 max-sm:w-[100px]"
                    colSpan={1}
                  >
                    RANK
                  </th>
                  <th className="truncate max-sm:px-2" colSpan={7}>
                    WALLET
                  </th>
                  <th className="truncate max-sm:px-2 text-center" colSpan={2}>
                    FCON AIRDROPPED
                  </th>
                  <th className="truncate max-sm:px-2 text-center" colSpan={2}>
                    FP REWARDS
                  </th>
                  <th className="truncate pr-9 text-right" colSpan={2}>
                    referral score
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataReferral?.results.length ? (
                  dataReferral?.results.map((item, idx) => {
                    return (
                      <tr
                        key={`row${idx}`}
                        className="h-12 border-b border-white/[0.08] font-medium last:border-b-0"
                      >
                        <td colSpan={1} className="pl-9 max-sm:w-[100px]">
                          {item.rank}
                        </td>
                        <td className="uppercase max-sm:px-2" colSpan={7}>
                          {shortAddress(item.wallet_address)}
                        </td>
                        <td className="max-sm:px-2 text-center" colSpan={2}>
                          {item.fcon_airdrop || 0}
                        </td>
                        <td className="max-sm:px-2 text-center" colSpan={2}>
                          {item.fp_reward || 0}
                        </td>
                        <td className="pr-9 text-right" colSpan={2}>
                          {item.refers || 0}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="w-full text-center !font-chakraPetch text-sm capitalize italic opacity-60">
                    <td colSpan={10} className="pt-11">
                      <EmptyBox />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
      {dataReferral?.results.length && (
        <div className="mt-5 flex w-full items-center justify-end gap-2">
          {/* <button
            className="text-xl font-bold transition-all duration-300 ease-in-out hover:scale-105 disabled:opacity-50"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={classNames(
                "flex h-10 w-10 items-center justify-center transition-all duration-200 ease-in-out",
                page === index + 1
                  ? "border border-white/[0.15] bg-white/[0.08]"
                  : "border-none bg-none",
              )}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="text-xl font-bold transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-80 disabled:opacity-50"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            {">"}
          </button> */}
          <button
            className="text-xl font-bold transition-all duration-300 ease-in-out hover:scale-105 disabled:opacity-50"
            onClick={() => handlePageChange(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            {"<"}
          </button>
          {pageNumbers.map((pageNumber, index) =>
            typeof pageNumber === "number" ? (
              <button
                key={index}
                onClick={() => handlePageChange(pageNumber)}
                className={classNames(
                  "flex h-10 w-10 items-center justify-center transition-all duration-200 ease-in-out",
                  page === pageNumber
                    ? "border border-white/[0.15] bg-white/[0.08]"
                    : "border-none bg-none",
                )}
              >
                {pageNumber}
              </button>
            ) : (
              <span
                key={index}
                className="flex h-10 w-10 items-center justify-center"
              >
                ...
              </span>
            ),
          )}
          <button
            className="text-xl font-bold transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-80 disabled:opacity-50"
            onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            {">"}
          </button>
          <div>
            <select
              value={pageSize}
              onChange={(e) => handleChangePageSize(e)}
              className="ml-2 bg-white/[0.08]"
            >
              {optionPageSize.map((numberPageSize) => {
                return (
                  <option
                    className="border border-white/[0.15] bg-black"
                    key={`page-size-${numberPageSize}`}
                    value={numberPageSize}
                  >
                    {numberPageSize}/page
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
