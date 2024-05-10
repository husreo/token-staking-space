import Translation from "utils/translation";
import ForgotPasswordForm from "./ForgotPasswordForm";

const ForgotPassword = async () => {
  return (
    <div className="mx-auto flex h-full w-full max-w-xl flex-col items-center justify-center px-3 md:px-0">
      <div className="w-full rounded-[10px] bg-white p-5 sm:p-10">
        <h1 className="mb-9 text-center text-[32px] font-medium text-black sm:text-left">
          <Translation text="nav.forgot-password" />
        </h1>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
