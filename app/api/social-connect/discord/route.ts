import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  console.log("process.env.GAME_API: ", process.env.GAME_API)
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.access_token) {
      return new Response(
        JSON.stringify({
          message: "Unauthorized",
        }),
        {
          status: 403,
        },
      );
    }

    const url = process.env.GAME_API as string;
    const reqURL = new URL(req.url);
    const reqSearchParams = reqURL.searchParams;
    const clientId = process.env.DISCORD_CLIENT_ID as string;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET as string;
    const redirectUri = process.env.DISCORD_REDIRECT_URI as string;
    const code = reqSearchParams.get("code");

    console.log({code})

    if (code) {
      const params = {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code: code.toString(),
        redirect_uri: redirectUri,
      };
      const formData = new URLSearchParams(params);
      const output = await fetch("https://discord.com/api/v10/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      const data = await output.json();
      if (data) {
        const access_token = data?.access_token;
        const discordUserInfoRes = await fetch(
          "https://discord.com/api/v10/users/@me",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          },
        );
        const discordUserInfo = await discordUserInfoRes.json();
        console.log({discordUserInfo})

        if (discordUserInfo) {
          const bodyObj: Record<string, string> = {
            id: discordUserInfo.id,
            username: discordUserInfo.username,
          };
          const connectDiscordRes = await fetch(
            `${url}/v1/user/connect-discord`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.access_token}`,
                // "X-API-Key": process.env.X_API_KEY as string,
              },
              body: JSON.stringify(bodyObj),
            },
          );
          const connectDiscordData = await connectDiscordRes.json();
          console.log({connectDiscordData})
          if (connectDiscordRes.ok && connectDiscordRes.status === 200) {
            return NextResponse.json({ data: connectDiscordData.data });
          } else {
            return NextResponse.json({ error: true, data: { ...connectDiscordData } });
          }
        }
      } else {
        throw data;
      }
    }
  } catch (error: any) {
    console.log({error})
    return NextResponse.json({
      error: true,
      data: {
        message: JSON.stringify({ ...error })
      }
    });
  }
}
