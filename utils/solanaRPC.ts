import axios from "axios";
import { SOLANA_RPC_MAINET } from "constants/global";
import { get } from "react-hook-form";

export async function callRpcApi(method: string, params: unknown[]) {
  const response = await axios({
    url: SOLANA_RPC_MAINET,
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: [
      {
        method,
        id: 1,
        jsonrpc: "2.0",
        params: [
          ...params,
          {
            encoding: "jsonParsed",
            commitment: "Confirmed",
          },
        ],
      },
    ],
  });
  return get(response, "data[0].result.value", []);
}
