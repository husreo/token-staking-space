import { bsc, holesky } from "viem/chains";
import INVENTORY_TICKET from "./INVENTORY_TICKET_ABI.json";
import INVENTORY_TICKET_HOLESKY from "./INVENTORY_TICKET_HOLESKY_ABI.json";
import MINT_TICKET from "./MINT_NFT_TICKET_ABI.json";
import MINT_TICKET_HOLESKY from "./MINT_NFT_TICKET_HOLESKY_ABI.json";

const mintENV = process.env.NEXT_PUBLIC_MINT_ENV;

export const MINT_BSC_TICKET_IDENTITY_PASS =
  mintENV === "production"
    ? "0xBf9854B0105ec0e5Bc81A4C97DbD9612f1d3D036"
    : "0xe2c878ce723dab9c8ee71b499838ae6f277eed4a";
export const INVENTORY_BSC_TICKET_IDENTITY_PASS =
  mintENV === "production"
    ? "0x4430a279528C91EcFe8Bb0ECbFD955EFc78621b4"
    : "0x5e05ccae162cc0d387b0c1c0f302d53765f80d57";

export const priceBNBFunctionName =
  mintENV === "production" ? "pricePerBNB" : "PricePerBNB";

export const MINT_TICKET_ABI =
  mintENV === "production" ? MINT_TICKET : MINT_TICKET_HOLESKY;
export const INVENTORY_TICKET_ABI =
  mintENV === "production" ? INVENTORY_TICKET : INVENTORY_TICKET_HOLESKY;
export const targetChainMint =
  process.env.NEXT_PUBLIC_MINT_ENV === "production" ? bsc.id : holesky.id;
