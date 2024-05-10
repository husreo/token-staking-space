import {
  ALLOW_CHAIN_ID,
  ALLOW_SOLANA_NETWORKS,
  CHAINS,
  ChainIdRecord,
  SolanaChainIdRecord,
} from "types/token";
import { Hex } from "viem";
import {
  arbitrum,
  bsc,
  bscTestnet,
  goerli,
  mainnet,
  mantle,
  mantleTestnet,
  optimism,
} from "wagmi/chains";

// export const ADMIN_ADDRESS = "FJMRSxX2cq3tKXCbKRL9HgYoGJLMDP3xVtSGWD7ewXRk";
export const ADMIN_ADDRESS = "D4UqXgih4ZVgYuEL846KhWoawkwoPH1xHfoFaTVztNyv";
export const ADDRESS_WALLET_NFT =
  "FBYfu5qS4qmFtZVoZW4NrW1nsejKh6mLLZ2HhJXViD6U";
export const ADDRESS_DEPOSIT_FCON =
  "D4UqXgih4ZVgYuEL846KhWoawkwoPH1xHfoFaTVztNyv";

export const MAX_TRANSFERABLE_NFT = 5;

export const PAYMENT_METHODS = {
  credit: "credit_debit",
  paypal: "paypal",
  binance: "binance",
  googlepay: "googlepay",
  stripe: "stripe",
  coinbase: "coinbase",
  coinbase_wallet: "coinbaseWallet",
  solana: "solana",
  applepay: "applepay",
  injected: "injected_wallet",
  token: "token",
  metamask: "metaMask",
  more_wallet: "walletConnect",
};

const USDC_FEED_ID =
  "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a";
const USDC_FEED_ID_TESTNET =
  "0x41f3625971ca2ed2263e78573fe5ce23e13d2558ed3f2e47ab0f84fb9e7ae722";
const USDT_FEED_ID =
  "0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b";
const USDT_FEED_ID_TESTNET =
  "0x1fc18861232290221461220bd4e2acd1dcdfbc89c84092c93c18bdc7756c1588";
const MNT_FEED_ID =
  "0x4e3037c822d852d79af3ac80e35eb420ee3b870dca49f9344a38ef4773fb0585";
const MNT_FEED_ID_TESTNET =
  "0xd45b6d47bf43faa700e6f6fec4f8989fcc80eabb2f2eff862d7258d60026d1b5";
export const ETH_FEED_ID_TESTNET =
  "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6";
export const ETH_FEED_ID =
  "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace";

// Note: tokens on Solana
const SOLANA_USDC_FEED_ID = "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD";
const SOLANA_NATIVE_FEED_ID = "H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG";
const SOLANA_FCON_FEED_ID = "spacefalcon";
const SOLANA_USDC_FEED_ID_TESTNET =
  "GBvYgUMCt4nvycUZMEBpHyLEXGbKjr6G9HjMjmLyf6mA";
const SOLANA_NATIVE_FEED_ID_TESTNET =
  "7VJsBtJzgTftYzEeooSDYyjKXvYRWJHdwvbwfBvTg9K";
const SOLANA_FCON_FEED_ID_TESTNET = "spacefalcon";
const SOLANA_USDC_FEED_ID_DEVNET =
  "5SSkXsEKQepHHAewytPVwdej4epN1nxgLVM84L4KXgy7";
const SOLANA_NATIVE_FEED_ID_DEVNET =
  "J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix";
const SOLANA_FCON_FEED_ID_DEVNET = "spacefalcon";

export const CHAIN_NAMES: Record<ALLOW_CHAIN_ID, string> = {
  [arbitrum.id]: "Arbitrum",
  [bsc.id]: "BNB Chain",
  [mainnet.id]: mainnet.name,
  [mantle.id]: mantle.name,
  [mantleTestnet.id]: "Mantle Goerli",
  [optimism.id]: "Optimism",
  [goerli.id]: "Goerli",
};

export const CHAIN_SYMBOL: Record<number, string> = {
  [goerli.id]: goerli.network,
  [mantleTestnet.id]: "mnt-testnet",
  [mantle.id]: "mantle",
  [optimism.id]: "op",
  [bsc.id]: "bsc",
  [arbitrum.id]: "arb",
  [mainnet.id]: "eth",
};

export type CHAIN_CONTRACTS = Record<number, CONTRACTS>;
export const USDT_MAINET = "0xdac17f958d2ee523a2206206994597c13d831ec7";
export type CONTRACTS = {
  NFT_COLLECTIONS_CONTRACT?: Hex[];
  NFT_INTERACTION_CONTRACT?: Hex;
  BUY_FP_CONTRACT?: Hex;
  MINT_NFT_CONTRACT?: Hex;
};

export const CONTRACTS_MAINNET: CHAIN_CONTRACTS = {
  [bsc.id]: {
    NFT_COLLECTIONS_CONTRACT: ["0x0541da2e0A4834DfA9757f93c993054ca3AB5827"],
    NFT_INTERACTION_CONTRACT: "0xcc78Ba0AcDe3B698437205f149410e01fd26CEC4",
    BUY_FP_CONTRACT: "0xf547b46731292c63451aD5302442b903F16336fe",
    MINT_NFT_CONTRACT: "0x0541da2e0A4834DfA9757f93c993054ca3AB5827",
  },
  [mainnet.id]: {
    NFT_COLLECTIONS_CONTRACT: ["0x"],
    NFT_INTERACTION_CONTRACT: "0x",
    BUY_FP_CONTRACT: "0xdB0491F5A3c5B818A7250B64AdcAc337DeEf173E",
    MINT_NFT_CONTRACT: "0x",
  },
};
export const CONTRACTS_TESTNET: CHAIN_CONTRACTS = {
  [goerli.id]: {
    NFT_COLLECTIONS_CONTRACT: ["0x0541da2e0A4834DfA9757f93c993054ca3AB5827"],
    NFT_INTERACTION_CONTRACT: "0xcc78Ba0AcDe3B698437205f149410e01fd26CEC4",
    BUY_FP_CONTRACT: "0x8da00f932432a80f8bffbee471bb2cfe5222ddd2",
    MINT_NFT_CONTRACT: "0x0541da2e0A4834DfA9757f93c993054ca3AB5827",
    // MINT_NFT_CONTRACT: "0xb63a365259b2a247bc3697b53a24029cb8906907",
  },
  [bsc.id]: {
    NFT_COLLECTIONS_CONTRACT: ["0x0541da2e0A4834DfA9757f93c993054ca3AB5827"],
    NFT_INTERACTION_CONTRACT: "0xcc78Ba0AcDe3B698437205f149410e01fd26CEC4",
    BUY_FP_CONTRACT: "0xf547b46731292c63451aD5302442b903F16336fe",
    MINT_NFT_CONTRACT: "0x0541da2e0A4834DfA9757f93c993054ca3AB5827",
  },
  [mainnet.id]: {
    NFT_COLLECTIONS_CONTRACT: ["0x"],
    NFT_INTERACTION_CONTRACT: "0x",
    BUY_FP_CONTRACT: "0xdB0491F5A3c5B818A7250B64AdcAc337DeEf173E",
    MINT_NFT_CONTRACT: "0x",
  },
};

export const MAINNET_NETWORK: CHAINS[] = [
  {
    ...mainnet,
    logo: "/images/network/eth.png",
    tokens: [
      {
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        priceFeedId: USDT_FEED_ID,
        symbol: "usdt",
        decimal: 6,
        logo: "/images/tokens/tether.png",
      },
      {
        isNative: true,
        priceFeedId: ETH_FEED_ID,
        symbol: "eth",
        decimal: 18,
        address: "0x",
        logo: "/images/network/eth.png",
      },
    ],
  },
  {
    ...bsc,
    logo: "/images/network/bnb.png",
    tokens: [
      {
        address: "0x55d398326f99059fF775485246999027B3197955",
        priceFeedId: USDT_FEED_ID,
        symbol: "usdt",
        decimal: 18,
        logo: "/images/tokens/tether.png",
      },
      // {
      //   address: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
      //   priceFeedId: ETH_FEED_ID,
      //   symbol: "weth",
      //   decimal: 18,
      //   logo: "/images/network/eth.png",
      // },
      {
        isNative: true,
        priceFeedId:
          "0x2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f",
        symbol: "bnb",
        decimal: 18,
        address: "0x",
        logo: "/images/network/bnb.png",
      },
    ],
  },
];

export const TESTNET_NETWORK: CHAINS[] = [
  {
    ...bsc,
    logo: "/images/network/bnb.png",
    tokens: [
      {
        address: "0x55d398326f99059fF775485246999027B3197955",
        priceFeedId: USDT_FEED_ID,
        symbol: "usdt",
        decimal: 18,
        logo: "/images/tokens/tether.png",
      },
      // {
      //   address: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
      //   priceFeedId: ETH_FEED_ID,
      //   symbol: "weth",
      //   decimal: 18,
      //   logo: "/images/network/eth.png",
      // },
      {
        isNative: true,
        priceFeedId:
          "0x2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f",
        symbol: "bnb",
        decimal: 18,
        address: "0x",
        logo: "/images/network/bnb.png",
      },
    ],
  },
  {
    ...goerli,
    logo: "/images/network/eth.png",
    tokens: [
      {
        address: "0x78f9350e01916d537bda1f02f3bff65bb3d27525",
        priceFeedId: USDT_FEED_ID_TESTNET,
        symbol: "usdt",
        decimal: 18,
        logo: "/images/tokens/tether.png",
      },
      {
        isNative: true,
        priceFeedId: ETH_FEED_ID_TESTNET,
        symbol: "eth",
        decimal: 18,
        address: "0x",
        logo: "/images/network/eth.png",
      },
    ],
  },
  {
    ...mainnet,
    logo: "/images/network/eth.png",
    tokens: [
      {
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        priceFeedId: USDT_FEED_ID,
        symbol: "usdt",
        decimal: 6,
        logo: "/images/tokens/tether.png",
      },
      {
        isNative: true,
        priceFeedId: ETH_FEED_ID,
        symbol: "eth",
        decimal: 18,
        address: "0x",
        logo: "/images/network/eth.png",
      },
    ],
  },
  // {
  //   ...mantleTestnet,
  //   logo: "/images/network/eth.png",
  //   tokens: [
  //     {
  //       address: "0x2ED3c15eC59CE827c4aBBabfF76d37562558437D",
  //       priceFeedId: USDC_FEED_ID_TESTNET,
  //       symbol: "usdc",
  //       decimal: 6,
  //       logo: "/images/tokens/usdc.png",
  //     },
  //     {
  //       address: "0xB262E32Ae32dBB2dA6fc8E1B836Cb2e14Fab82b7",
  //       priceFeedId: USDT_FEED_ID_TESTNET,
  //       decimal: 6,
  //       symbol: "usdt",
  //       logo: "/images/tokens/tether.png",
  //     },
  //     {
  //       isNative: true,
  //       priceFeedId: MNT_FEED_ID_TESTNET,
  //       symbol: "mnt",
  //       decimal: 18,
  //       address: "0x",
  //       logo: "/images/tokens/usdc.png",
  //     },
  //   ],
  // },
];

export const SOLANA_MAINNET_NETWORK: CHAINS[] = [
  {
    id: 101,
    network: "Mainnet",
    name: "Mainnet Beta",
    nativeCurrency: { name: "Sol", symbol: "SOL", decimals: 9 },
    rpcUrls: {
      default: {
        http: ["https://api.mainnet-beta.solana.com"],
      },
      public: {
        http: ["https://api.mainnet-beta.solana.com"],
      },
    },
    blockExplorers: {
      default: {
        name: "Solana Explorer",
        url: "https://explorer.solana.com/",
      },
    },
    logo: "/images/network/solana.png",
    tokens: [
      {
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        priceFeedId: SOLANA_USDC_FEED_ID,
        symbol: "usdc",
        decimal: 6,
        logo: "/images/tokens/usdc.png",
      },
      {
        address: "HovGjrBGTfna4dvg6exkMxXuexB3tUfEZKcut8AWowXj",
        priceFeedId: SOLANA_FCON_FEED_ID,
        symbol: "fcon",
        decimal: 4,
        logo: "/images/tokens/fcon.svg",
      },
      {
        isNative: true,
        priceFeedId: SOLANA_NATIVE_FEED_ID,
        symbol: "sol",
        decimal: 9,
        address: "So11111111111111111111111111111111111111112",
        logo: "/images/network/solana.png",
      },
    ],
  },
];

export const SOLANA_TESTNET_NETWORK: CHAINS[] = [
  {
    id: 102,
    network: "Testnet",
    name: "Testnet",
    nativeCurrency: { name: "Sol", symbol: "SOL", decimals: 9 },
    rpcUrls: {
      default: {
        http: ["https://api.testnet.solana.com"],
      },
      public: {
        http: ["https://api.testnet.solana.com"],
      },
    },
    blockExplorers: {
      default: {
        name: "Solana Explorer",
        url: "https://explorer.solana.com",
      },
    },
    logo: "/images/network/solana.png",
    tokens: [
      {
        address: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
        priceFeedId: SOLANA_USDC_FEED_ID_TESTNET,
        symbol: "usdc",
        decimal: 6,
        logo: "/images/tokens/usdc.png",
      },
      {
        address: "HovGjrBGTfna4dvg6exkMxXuexB3tUfEZKcut8AWowXj",
        priceFeedId: SOLANA_FCON_FEED_ID_TESTNET,
        symbol: "fcon",
        decimal: 4,
        logo: "/images/tokens/fcon.svg",
      },
      {
        isNative: true,
        priceFeedId: SOLANA_NATIVE_FEED_ID_TESTNET,
        symbol: "sol",
        decimal: 9,
        address: "",
        logo: "/images/network/solana.png",
      },
    ],
  },
];

export const SOLANA_DEVNET_NETWORK: CHAINS[] = [
  {
    id: 103,
    network: "Devnet",
    name: "Devnet",
    nativeCurrency: { name: "Sol", symbol: "SOL", decimals: 9 },
    rpcUrls: {
      default: {
        http: ["https://api.devnet.solana.com"],
      },
      public: {
        http: ["https://api.devnet.solana.com"],
      },
    },
    blockExplorers: {
      default: {
        name: "Solana Explorer",
        url: "https://explorer.solana.com",
      },
    },
    logo: "/images/network/solana.png",
    tokens: [
      {
        address: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
        priceFeedId: SOLANA_USDC_FEED_ID_DEVNET,
        symbol: "usdc",
        decimal: 6,
        logo: "/images/tokens/usdc.png",
      },
      // {
      //   address: "HovGjrBGTfna4dvg6exkMxXuexB3tUfEZKcut8AWowXj",
      //   priceFeedId: SOLANA_FCON_FEED_ID_DEVNET,
      //   symbol: "fcon",
      //   decimal: 4,
      //   logo: "/images/tokens/fcon.svg",
      // },
      {
        isNative: true,
        priceFeedId: SOLANA_NATIVE_FEED_ID_DEVNET,
        symbol: "sol",
        decimal: 9,
        address: "So11111111111111111111111111111111111111112",
        logo: "/images/network/solana.png",
      },
    ],
  },
];

export const ALLOW_CHAINS = {
  testnet: [mantleTestnet, bscTestnet, goerli],
  mainet: [optimism, mantle, mainnet, bsc, arbitrum],
};

// export const RECIPIENT_ADDRESSES: Record<ALLOW_CHAIN_ID, string> = {
//   [arbitrum.id]: "0x6eB8dF62Cb7D3A92AEbeC6ED675194846A55ECa6",
//   [bsc.id]: "0x6eB8dF62Cb7D3A92AEbeC6ED675194846A55ECa6",
//   [mainnet.id]: "0x6eB8dF62Cb7D3A92AEbeC6ED675194846A55ECa6",
//   [mantle.id]: "0x6eB8dF62Cb7D3A92AEbeC6ED675194846A55ECa6",
//   [mantleTestnet.id]: "0x6eB8dF62Cb7D3A92AEbeC6ED675194846A55ECa6",
//   [optimism.id]: "0x6eB8dF62Cb7D3A92AEbeC6ED675194846A55ECa6",
// };

export const DEPOSIT_CHAIN_NAME: Record<number, string> = {
  [mantleTestnet.id]: "mnt-testnet",
  [arbitrum.id]: "arb",
  [goerli.id]: "goerli",
  [bsc.id]: "bsc",
  [mainnet.id]: "eth",
};

export const SOLANA_DEPOSIT_CHAIN_NAME: Record<number, string> = {
  101: "solana-mainnet-beta",
  102: "testnet",
  103: "solana-devnet",
};

// Based on Coinmarketcap
export const NATIVE_TOKEN_DETAILS: Record<
  number,
  { name: string; priceInUSD: number }
> = {
  [arbitrum.id]: { name: "ARB", priceInUSD: 1.01 },
  [bsc.id]: { name: "BNB", priceInUSD: 219.79 },
  [mainnet.id]: { name: "ETH", priceInUSD: 1673.02 },
  [mantle.id]: { name: "MNT", priceInUSD: 0.4257 },
  [mantleTestnet.id]: { name: "MNT", priceInUSD: 0.4257 },
  [optimism.id]: { name: "OP", priceInUSD: 1.56 },
};

export const CHAIN_FEED_IDS: Record<"mainnet" | "testnet", Hex[]> = {
  mainnet: [USDC_FEED_ID, USDT_FEED_ID, MNT_FEED_ID],
  testnet: [MNT_FEED_ID_TESTNET, USDC_FEED_ID_TESTNET, USDT_FEED_ID_TESTNET],
};

export const SOLANA_CHAIN_FEED_IDS: Record<ALLOW_SOLANA_NETWORKS, string[]> = {
  mainnet: [SOLANA_USDC_FEED_ID],
  testnet: [SOLANA_USDC_FEED_ID_TESTNET],
  devnet: [SOLANA_USDC_FEED_ID_DEVNET],
};

export const EVM_TOKENS: ChainIdRecord = {
  [arbitrum.id]: [
    {
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      priceFeedId: USDC_FEED_ID,
      symbol: "usdc",
      decimal: 6,
    },
    {
      address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      priceFeedId: USDT_FEED_ID,
      symbol: "usdt",
      decimal: 6,
    },
  ],
  // [bsc.id]: {
  //   usdc: {
  //     address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
  //     priceFeedId: USDC_FEED_ID,
  //   },
  //   usdt: {
  //     address: "0x0000000000000000000000000000000000000000",
  //     priceFeedId: USDT_FEED_ID,
  //   },
  // },
  // [mainnet.id]: {
  //   usdc: {
  //     address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  //     priceFeedId: USDC_FEED_ID,
  //   },
  //   usdt: {
  //     address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  //     priceFeedId: USDT_FEED_ID,
  //   },
  // },
  [mantle.id]: [
    {
      address: "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9",
      priceFeedId: USDC_FEED_ID,
      symbol: "usdt",
      decimal: 6,
    },
    {
      address: "0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE",
      priceFeedId: USDT_FEED_ID,
      symbol: "usdt",
      decimal: 6,
    },
    {
      isNative: true,
      priceFeedId: MNT_FEED_ID,
      symbol: "mnt",
      decimal: 18,
      address: "0x",
    },
  ],

  // [optimism.id]: {
  //   usdc: {
  //     address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
  //     priceFeedId: USDT_FEED_ID,
  //   },
  //   usdt: {
  //     address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
  //     priceFeedId: USDT_FEED_ID,
  //   },
  // },
};

export const EVM_TOKENS_TESTNET: ChainIdRecord = {
  [mantleTestnet.id]: [
    {
      address: "0x2ED3c15eC59CE827c4aBBabfF76d37562558437D",
      priceFeedId: USDC_FEED_ID_TESTNET,
      symbol: "usdc",
      decimal: 6,
    },
    {
      address: "0xB262E32Ae32dBB2dA6fc8E1B836Cb2e14Fab82b7",
      priceFeedId: USDT_FEED_ID_TESTNET,
      decimal: 6,
      symbol: "usdt",
    },
    {
      isNative: true,
      priceFeedId: MNT_FEED_ID_TESTNET,
      symbol: "mnt",
      decimal: 18,
      address: "0x",
    },
  ],
};

export const SOLANA_TOKENS: SolanaChainIdRecord = {
  101: [
    {
      address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      priceFeedId: SOLANA_USDC_FEED_ID,
      symbol: "usdc",
      decimal: 6,
    },
    {
      address: "HovGjrBGTfna4dvg6exkMxXuexB3tUfEZKcut8AWowXj",
      priceFeedId: SOLANA_FCON_FEED_ID,
      symbol: "fcon",
      decimal: 4,
    },
    {
      isNative: true,
      priceFeedId: SOLANA_NATIVE_FEED_ID,
      symbol: "sol",
      decimal: 9,
      address: "",
    },
  ],

  // [optimism.id]: {
  //   usdc: {
  //     address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
  //     priceFeedId: USDT_FEED_ID,
  //   },
  //   usdt: {
  //     address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
  //     priceFeedId: USDT_FEED_ID,
  //   },
  // },
};

export const SOLANA_TOKENS_TESTNET: SolanaChainIdRecord = {
  102: [
    {
      address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      priceFeedId: SOLANA_USDC_FEED_ID_TESTNET,
      symbol: "usdc",
      decimal: 6,
    },
    {
      address: "HovGjrBGTfna4dvg6exkMxXuexB3tUfEZKcut8AWowXj",
      priceFeedId: SOLANA_FCON_FEED_ID_TESTNET,
      decimal: 4,
      symbol: "fcon",
    },
    {
      isNative: true,
      priceFeedId: SOLANA_NATIVE_FEED_ID_TESTNET,
      symbol: "sol",
      decimal: 9,
      address: "",
    },
  ],
};

export const SOLANA_TOKENS_DEVNET: SolanaChainIdRecord = {
  103: [
    {
      address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      priceFeedId: SOLANA_USDC_FEED_ID_DEVNET,
      symbol: "usdc",
      decimal: 6,
    },
    // {
    //   address: "HovGjrBGTfna4dvg6exkMxXuexB3tUfEZKcut8AWowXj",
    //   priceFeedId: SOLANA_FCON_FEED_ID_DEVNET,
    //   decimal: 4,
    //   symbol: "fcon",
    // },
    {
      isNative: true,
      priceFeedId: SOLANA_NATIVE_FEED_ID_DEVNET,
      symbol: "sol",
      decimal: 9,
      address: "So11111111111111111111111111111111111111112",
    },
  ],
};

// export const CHAINS = [mantleTestnet.id];
export const TOKEN_TYPES = ["nativeToken", "usdc", "usdt"];
// export const TOKEN_TYPES = ["usdc", "usdt"];
