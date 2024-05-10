import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const LoginCredential = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  } else {
    redirect("/login");
  }
  // return (
  //   <div className="mx-auto flex h-full w-full max-w-md flex-col justify-center">
  //     <div>
  //       <h1 className="mb-9 text-[32px] font-medium">Login</h1>
  //       <CredentialForm />
  //       <Link href={"/forgot-password"}>
  //         <Button
  //           variant="muted"
  //           type="submit"
  //           className="mt-3 w-full rounded-[1000px] px-6 py-3 text-black"
  //         >
  //           <Translation text="nav.forgot-password" />
  //         </Button>
  //       </Link>
  //     </div>
  //   </div>
  // );
};

export default LoginCredential;
