"use client";

import ModalEcosystem from "@/components/dashboard/modal/ModalEcosystem";
import ModalWrapper from "@/components/shared/ModalWrapper";
import { useThrottleFn } from "ahooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setOnboardingModal } from "store/features/user/userSlice";
import { sleep } from "utils/promise";

export default function Template({ children }: { children: React.ReactNode }) {
  const { session, onboardingModal } = useSelector(
    (state: RootState) => state.user,
  );
  const [hasToggle, setHasToggle] = useState(false);
  const dispatch = useDispatch();
  const handleOpenModal = async () => {
    await sleep(200);
    dispatch(setOnboardingModal(true));
    setHasToggle(true);
  };

  const { run } = useThrottleFn(handleOpenModal);

  // useEffect(() => {
  //   if (session?.provider && !session?.user.is_verified && !hasToggle) {
  //     run();
  //   }
  //   // if (session?.user?.is_verified) {
  //   //   dispatch(setOnboardingModal(false));
  //   // }
  // }, [dispatch, run, session, hasToggle]);

  return (
    <>
      <ModalWrapper
        onClose={() => {
          dispatch(setOnboardingModal(false));
        }}
        open={onboardingModal}
      >
        <ModalEcosystem />
      </ModalWrapper>
      {children}
    </>
  );
}
