import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginPanel from "./LoginPanel";

const Login = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex h-full w-full items-center justify-center px-3 min-[650px]:px-40 min-[850px]:px-0">
      <LoginPanel />
    </div>
  );
};

export default Login;
