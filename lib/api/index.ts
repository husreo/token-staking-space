
export async function getUserData({ token }: { token: string }) {
  const URL = process.env.GAME_API as string;
  const userReq = await fetch(`${URL}/api/v1/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
      // "X-API-Key":
      //   "kBUlbZLHUM1rQUM8OEMqYCCVJ7VFtJasLn4MGwRwwE5Bkrz4NNvtyYqHNGW8B8tG",
    },
  });
  if (userReq.ok) {
    const data = await userReq.json();
    return data;
  } else if (userReq.status === 401) throw Error("unauthorized");
}

export const getPlatformStats = async () => {
  try {
    // const url = process.env.GAME_API as string;

    // const response = await fetch(`${url}/v1/game/platform`, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   cache: "no-store",
    // });
    // const responseJson = await response.json();
    // if (response.ok && response.status === 200)
    //   return responseJson as IPlatformStats;

    return {} as any;
  } catch (error) {
    console.log("error", error);
    return {} as any;
  }
};
