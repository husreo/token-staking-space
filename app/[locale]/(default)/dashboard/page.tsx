import DashboardPage from "@/components/dashboard/dashboard-page";
// import { authOptions } from "@/lib/utils";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

const Dashboard = () => {
  // const session = await getServerSession(authOptions);
  // if (!session?.access_token) {
  //   redirect("/new-user?callbackUrl=dashboard&type=not_signed_up");
  // }
  return (
    <div className="min-h-screen bg-gray0 mt-[88px]">
      {/* <ComponentContainer className="max-[320px]: !max-w-[1204px] px-4 sm:px-10 xl:px-0"> */}
      {/* <DashboardTab /> */}
      {/* </ComponentContainer> */}
      <DashboardPage />
    </div>
  );
};

export default Dashboard;
