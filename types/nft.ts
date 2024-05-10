import { Hex } from "viem";

export type NFTMetada = {
  image: string;
  id: number;
  chain_id: number;
  collection_address: Hex;
  updated_at: string;
  attributes: Record<string, string>;
  description: string;
  name: string;
  created_at: string;
};

export type ProfileNFTMetadata = {};

export type HeliusNFTMetadata = {
  account: string;
  onChainMetadata: {
    error: "";
    metadata: {
      collection: any;
      collectionDetails: any;
      data: {
        creators: Record<string, any>[];
        name: string;
        sellerFeeBasisPoints: number;
        symbol: string;
        uri: string;
      };
      editionNonce: number;
      isMutable: boolean;
      key: string;
      mint: string;
      primarySaleHappened: boolean;
      tokenStandard: string;
      updateAuthority: string;
    };
  };
  offChainMetadata: {
    error: string;
    metadata: {
      attributes: Record<string, string>[];
      description: string;
      image: string;
      name: string;
      properties: Record<string, string | any[]>;
      sellerFeeBasisPoints: number;
      symbol: string;
    };
    uri: string;
  };
} & {
  is_staked?: boolean;
  locked_at: string;
  locked_period: number;
  fp_daily_earning: number;
};
