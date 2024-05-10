export interface IPlatformStats {
  total_users: number;
  total_code_used: number;
  total_onchain: number;
  total_code_worth: number;
  total_whitelisted: number;
}

export type NFTType = {
  non_locked: number;
  locked: number;
};

export type LeaderboardRecord = {
  nickname: string;
  rp_balance: number;
  rp_accumulated: number;
  rank: number;
  nfts: {
    crates: number;
    ships: number;
    heroes: number;
    planets: NFTType;
  };
  user_id?: number;
  last_rp_earned: number;
  last_play_duration: number;
  last_played_game: number;
  total_play_duration: number;
  lifetime_rp: number;
  discord: {
    id: string;
    username: string;
  };
  telegram: {
    id: string;
    username: string;
  };
  presale_package: number;
};

export type StatsParams = {
  interval: StatsInterval;
  date_from: string;
  date_to: string;
};

export type StatsInterval = "day" | "week" | "month" | "year";

export type StatsType =
  | "new-user"
  | "fp-sold"
  | "rp-distributed"
  | "total-user"
  | "total-player";
