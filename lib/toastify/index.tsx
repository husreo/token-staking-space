import { ReactNode } from "react";
import { toast } from "react-toastify";
import ErrorToast from "./ErrorToast";
import SuccessToast from "./SuccessToast";

export const toastSuccess = (message: string | ReactNode) => {
  toast(
    ({ toastProps }) => <SuccessToast {...toastProps} message={message} key={`${message}`} />,
    {
      hideProgressBar: true,
      pauseOnHover: false,
    },
  );
};
export const toastError = (message: string | ReactNode) => {
  toast(({ toastProps }) => <ErrorToast {...toastProps} message={message} key={`${message}`} />, {
    hideProgressBar: true,
    pauseOnHover: false,
    closeButton: false
  });
};
