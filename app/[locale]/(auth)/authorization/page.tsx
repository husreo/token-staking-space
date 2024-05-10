import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Authorization = async (opts: {
  searchParams?: { [key: string]: string | string[] | undefined };
  params?: { locale: string };
}) => {
  const { params } = opts;
  const defaultURL = params?.locale ? "/" + params.locale + "/" : "/";
  const callback = opts?.searchParams?.callback;
  const session = await getServerSession(authOptions);
  const cb = { ...opts.searchParams };
  if (cb.callback) delete cb.callback;
  Object.keys(cb).forEach((k) => {
    if (!cb[k] || cb[k] === "null") {
      delete cb[k];
    }
  });

  if (session?.user?.nickname) {
    redirect(callback ? defaultURL + callback : "/");
  } else if (!session?.user?.nickname) {
    redirect(
      defaultURL +
        "new-user?" +
        Object.keys(cb)
          .map((i) => `${i}=${cb[i]}`)
          .join("&"),
    );
  } else if (!session) {
    redirect(defaultURL);
  }
  return <div>{opts?.searchParams?.callback}</div>;
};

export default Authorization;
