import ChangeUsername from "@/components/dashboard/accountSetting/ChangeUsername";
import AddressList from "@/components/dashboard/accountSetting/AddressList";

export const revalidate = 0;

const AccountSetting = () => {
  return (
    <div className="dark bg-gray0">
      <div className="mx-auto flex max-w-[1728px] flex-col pt-20">
        {/* <div className="flex w-80 flex-col p-9 text-white"> */}
        {/* <p>Password & Security</p>
          <p>Wallets</p> */}
        {/* </div> */}
        <div className="mx-auto h-full w-full max-w-[760px] px-3 pb-9 pt-9 text-white sm:px-9">
          <AddressList />
        </div>
        {/* <div className="mx-auto h-full w-full max-w-[760px] px-3 pb-9 pt-48 sm:px-9 sm:pt-32">
          <ConnectAccount />
        </div> */}
        <div className="mx-auto h-full w-full max-w-[760px] px-3 pb-9 pt-9 text-white sm:px-9">
          <ChangeUsername />
        </div>
        {/* <div className="mx-auto h-full w-full max-w-[760px] px-3 pb-9 pt-9 sm:px-9">
          <ResetPasswordForm />
        </div> */}
      </div>
    </div>
  );
};

export default AccountSetting;
