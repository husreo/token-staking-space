import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

const useOneTapSignin = (opt: { id: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { session, loadingSession } = useSelector(
    (state: RootState) => state.user,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 3000);

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (session) {
      setIsSignedIn(true);
    }
  }, [session]);

  useEffect(() => {
    if (!isLoading && !isSignedIn && !loadingSession && isMounted) {
      const { google } = window as any;
      if (google) {
        google.accounts.id.initialize({
          client_id: opt.id,
          callback: async (response: { credential: any }) => {
            setIsLoading(true);

            // Here we call our Provider with the token provided by google
            await signIn("googleonetap", {
              credential: response.credential,
              redirect: true,
            });
            setIsLoading(false);
          },
          prompt_parent_id: "google-one-tap",
        });

        // Here we just console.log some error situations and reason why the google one tap
        // is not displayed. You may want to handle it depending on yuor application
        google.accounts.id.prompt(
          (notification: {
            isNotDisplayed: () => any;
            getNotDisplayedReason: () => any;
            isSkippedMoment: () => any;
            getSkippedReason: () => any;
            isDismissedMoment: () => any;
            getDismissedReason: () => any;
          }) => {
            if (notification.isNotDisplayed()) {
              console.log(
                "getNotDisplayedReason",
                notification.getNotDisplayedReason(),
              );
            } else if (notification.isSkippedMoment()) {
              console.log("isSkippedMoment", notification.getSkippedReason());
            } else if (notification.isDismissedMoment()) {
              console.log(
                "isDismissedMoment",
                notification.getDismissedReason(),
              );
            }
          },
        );
      }
    }
  }, [isLoading, session, isSignedIn, isMounted, loadingSession]);

  return { isLoading, isSignedIn };
};

export default useOneTapSignin;
