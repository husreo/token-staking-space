"use client";

import { useSearchParams } from "next/navigation";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRefCode } from "store/features/bsc/bscSlice";

export default function ReferralCodeParams() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const referral = searchParams.get("referral");

  useEffect(() => {
    if ((referral ?? "")?.trim()?.length > 0) {
      dispatch(setRefCode((referral ?? "")?.trim()));
    }
  }, [referral, dispatch]);

  return <Fragment />;
}
