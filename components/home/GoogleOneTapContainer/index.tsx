"use client";

import useOneTapSignin from "@/lib/hooks/useOneTapSignin";

const GoogleOneTapContainer = ({ id }: { id: string }) => {
  useOneTapSignin({
    id,
  });
  return <div className="absolute right-8 top-32" id="google-one-tap"></div>;
};

export default GoogleOneTapContainer;
