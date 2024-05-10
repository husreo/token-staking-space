import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="h-screen w-screen bg-white">{children}</div>;
};

export default Layout;
