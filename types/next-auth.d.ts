import "next-auth";
import { IUser } from "./user";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultSession["user"] & IUser;
    isVerified: boolean;
    provider: string;
    providerAccountId: string;
    waitForVerify: boolean;
    access_token?: string;
  }
}
