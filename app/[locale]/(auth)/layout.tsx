import { NavLink } from "@/components/shared/string";
import Image from "next/image";

export default async function LoginLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex h-screen w-screen">
      {/* <Image
        className="absolute bottom-0 left-0 right-0 top-0 object-cover"
        src={SignInBG}
        fill
        alt="sign-in-bg"
        sizes="(max-width: 600px) 100vw, 100vw"
        quality={100}
      /> */}
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="relative flex flex-1 flex-col  md:flex-[2] lg:flex-1">
        <div className="absolute z-20 left-0 right-0 top-0 flex h-[88px] items-center px-0 md:px-7">
          <NavLink className="relative h-[50px] w-[128px]" href="/">
            <Image
              className="object-cover"
              src="/images/logo.png"
              fill
              alt="logo"
              quality={100}
              sizes="(max-width: 600px) 100vw, 100vw"
            />
          </NavLink>
        </div>
        <>{children}</>
      </div>
    </section>
  );
}
