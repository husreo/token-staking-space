use solana_program::native_token::LAMPORTS_PER_SOL;

pub const GLOBAL_AUTHORITY_SEED: &str = "global-sol-token-authority";
pub const USER_AUTHORITY_SEED: &str = "user-v1-authority";
pub const VAULT_AUTHORITY_SEED: &str = "vault-space-authority";
pub const USER_POOL_SEED: &str = "user-pool-facon-seed";

pub const DAY_SECONDS: u64 =  60 * 60 * 24;

// pub const ELMNT_ADDRESS: &str = "5CY4inXAWEKDENqJ5ZLNaTYX8gzjHZNXimuj7VmFmVi6";
pub const ELMNT_ADDRESS: &str = "5CY4inXAWEKDENqJ5ZLNaTYX8gzjHZNXimuj7VmFmVi6";

pub const ELMNT_DECIMAL: u64 = 1000000;

pub const SOL_AMOUNT: u64 = LAMPORTS_PER_SOL / 10;
pub const TOKEN_AMOUNT: u64 = ELMNT_DECIMAL * 1;
pub const TOKEN_LOW_RATE: u64 = ELMNT_DECIMAL / 10;
pub const SOL_LOW_RATE: u64 = ELMNT_DECIMAL / 10;

pub const LOCK_PERIOD: [i64; 3] = [120, 240, 300];
pub const REWARD_RATE: [u64; 3] = [0, 10, 20];