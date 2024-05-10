import Translation from "utils/translation";
import CredentialForm from "./credential/CredentialForm";

const LoginPanel = () => {
  return (
    <div className="z-20 w-full max-w-[556px] rounded-[10px] border bg-white px-5 py-10 font-aeonikPro max-lg:h-[95%] max-lg:max-h-[500px] max-lg:overflow-y-scroll max-[414px]:py-5 min-[850px]:px-20 min-[850px]:py-20">
      <div className="flex flex-col gap-4">
        <h1 className="text-center text-[28px] font-medium text-gray0 sm:text-[32px]">
          <Translation text="sign-in.title" />
        </h1>
        <CredentialForm />
      </div>
    </div>
  );
};

export default LoginPanel;
