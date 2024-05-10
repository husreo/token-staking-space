import {
  SolanaSignInInput,
  SolanaSignInOutput,
} from "@solana/wallet-standard-features";
import { verifySignIn } from "@solana/wallet-standard-util";
import { OAuth2Client } from "google-auth-library";
import ms from "ms";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
import { IUser } from "types/user";
import { generateRandomNumber } from "utils/number";
import { getUserData } from "../api";

const googleAuthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0";
}

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NEXT_PUBLIC_ENV === "testnet" ? true : false,
  providers: [
    CredentialsProvider({
      name: "siwe",
      id: "siwe",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials, req) {
        const url = process.env.NEXTAUTH_URL;
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}"),
          );
          const nextAuthUrl = new URL(url as string);

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req }),
          });

          if (result.success) {
            const reqExchangeToken = await fetch(
              `${process.env.GAME_API}/api/v1/user/auth`,
              {
                method: "POST",
                body: JSON.stringify({
                  public_wallet_address: siwe.address,
                  username: siwe.address,
                  is_evm: true,
                }),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "X-API-KEY": process.env.X_API_KEY as string,
                },
              },
            );

            const dataJson = await reqExchangeToken.json();

            if (reqExchangeToken.ok)
              return {
                id: "credentials" + generateRandomNumber(),
                access_token: dataJson.data.token,
              };
            return {
              id: siwe.address,
            };
          }
          return null;
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      id: "credentials",
      credentials: {
        payload: {
          label: "Payload",
          type: "text",
        },
        wallet_address: {
          label: "Wallet Address",
          type: "text",
        },
      },
      async authorize(credentials, req) {
        const payload = credentials?.payload;
        const wallet_address = credentials?.wallet_address;
        if (!payload || !wallet_address) return null;
        const deconstructPayload: {
          input: SolanaSignInInput;
          output: SolanaSignInOutput;
        } = JSON.parse(payload);
        const serialisedOutput: SolanaSignInOutput = {
          account: {
            // @ts-ignore
            publicKey: new Uint8Array(
              deconstructPayload.output.account.publicKey,
            ),
            ...deconstructPayload.output.account,
          },
          signature: new Uint8Array(deconstructPayload.output.signature),
          signedMessage: new Uint8Array(
            deconstructPayload.output.signedMessage,
          ),
        };

        if (!verifySignIn(deconstructPayload.input, serialisedOutput)) {
          const reqExchangeToken = await fetch(
            `${process.env.GAME_API}/api/v1/user/auth`,
            {
              method: "POST",
              body: JSON.stringify({
                public_wallet_address: wallet_address,
                username: wallet_address,
                is_evm: false,
              }),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-API-KEY": process.env.X_API_KEY as string,
              },
            },
          );
          console.log(`${process.env.GAME_API}/api/v1/user/auth`, {
            method: "POST",
            body: JSON.stringify({
              public_wallet_address: wallet_address,
              username: wallet_address,
              is_evm: false,
            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-API-KEY": process.env.X_API_KEY as string,
            },
          });
          const dataJson = await reqExchangeToken.json();

          if (reqExchangeToken.ok)
            return {
              id: "credentials" + generateRandomNumber(),
              access_token: dataJson.data.token,
            };

          return null;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt(p) {
      const { token, account, trigger, session, user } = p;
      //@ts-ignore
      let accessToken = token?.access_token || user?.access_token;
      //there will be 2 case
      //1. if login with social, access_token will be available in token
      //2. if login with credential, access_token will be available in user
      //prestique is user has been signed up before

      if (accessToken) {
        token.access_token = accessToken;
      }

      try {
        // if (
        //   (token.provider && token.providerAccountId) ||
        //   (trigger === "update" && session.type === "account")
        // ) {
        //   if (token.provider !== "credentials") {
        //     const response = await fetch(
        //       `${URL}/login?${token.provider}_id=${token.providerAccountId}`,
        //       {
        //         method: "GET",
        //         headers: {
        //           "Content-Type": "application/json",
        //           "X-API-Key": process.env.X_API_KEY as string,
        //         },
        //       },
        //     );
        //     const data = await response.json();
        //     if (response.ok && response.status === 200) {
        //       if (data?.access_token && !token.access_token) {
        //         token.access_token = data.access_token;
        //         accessToken = data.access_token;
        //       }
        //     } else {
        //     }
        //   }
        // }

        if (
          accessToken ||
          (trigger === "update" && session.type === "account" && accessToken)
        ) {
          const userData = await getUserData({
            token: accessToken as string,
          });
          const user: IUser = userData.data;
          token.user = {
            ...(token.user || {}),
            ...user,
          };
        }
      } catch (error: any) {
        token.user = {
          ...(token.user || {}),
          error: error.message,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: { ...session.user, ...(token.user || {}) },
        provider: token.provider,
        providerAccountId: token.providerAccountId,
        access_token: token.access_token,
      };
    },
    async signIn(p) {
      //@ts-ignore
      return !!p?.user?.["access_token"];
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      const params = new URLSearchParams(new URL(url).search);
      const callback = params.get("callbackUrl");
      if (callback) return `${baseUrl}${callback}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 30 days
  },
  cookies: {
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        httpOnly: false,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
};
