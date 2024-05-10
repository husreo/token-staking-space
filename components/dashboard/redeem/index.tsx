import Gift from "./Gift";
import RedeemRPStats from "./RedeemRPStats";
import RedeemRP from "./RedeemRPStats/RedeemRP";
import WithdrawReward from "./withdraw";

const DashboardRedeem = () => {
  return (
    <div className="grid grid-cols-12 gap-5 pb-20 font-aeonikPro text-white">
      <RedeemRP />
      {/* <RedeemRPStats /> */}
      {/* <WithdrawReward /> */}
      <Gift />
    </div>
  );
};

export default DashboardRedeem;
