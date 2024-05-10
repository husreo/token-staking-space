import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const expectedKeys = ["userName", "email", "password", "image"];
  const url = process.env.GAME_API as string;
  const res = await req.json();
  const missingKeys = expectedKeys.filter((key) => !(key in res));

  if (missingKeys.length > 0) {
    return new Response(
      JSON.stringify({
        error: `Missing parameters: ${missingKeys.join(", ")}`,
      }),
      {
        status: 500,
      },
    );
  }
  if (Object.keys(res).length) {
    try {
      const bodyObj: Record<string, string> = {
        username: res.userName.trimEnd(),
        email: res.email,
        password: res.password,
        image: res.image,
      };
      if (res.referralCode) {
        bodyObj.referral_code = res.referralCode;
      }
      if (res.nickName) {
        bodyObj.nickname = res.nickName;
      }
      if (res.provider && res.providerId) {
        bodyObj[`${res.provider}_id`] = res.providerId;
      }
      const response = await fetch(`${url}/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-Key": process.env.X_API_KEY as string,
        },
        body: JSON.stringify(bodyObj),
      });
      const data = await response.json();
      if (response.ok && response.status === 200) {
        return NextResponse.json({
          ...data,
        });
      } else {
        throw data;
      }
    } catch (error: any) {
      console.log("api", error);
      return new Response(
        JSON.stringify({
          ...error,
        }),
        {
          status: 500,
        },
      );
    }
  }
}
