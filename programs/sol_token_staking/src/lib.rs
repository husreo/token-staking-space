use anchor_lang::{prelude::*, AnchorDeserialize};

pub mod constant;
pub mod error;
pub mod instructions;
pub mod state;
pub mod util;
use constant::*;
use error::*;
use instructions::*;
use state::*;
use util::*;

declare_id!("GYoCpTHXyFJL5tJYGgjpmtu4LGsRo1rqPmTQsaz6yyG");

#[program]
pub mod sol_token_staking {
    use super::*;

    /**
     * Initialize global pool
     * super admin sets to the caller of this instruction
     */
    pub fn initialize(mut ctx: Context<Initizlize>) -> Result<()> {
        Initizlize::process_instruction(&mut ctx)
    }

    //initialize  user pool
    pub fn inituser(mut ctx: Context<Inituser>) -> Result<()> {
        Inituser::process_instruction(&mut ctx)
    }

    pub fn lock_token(ctx: Context<LockToken>, amount: u64) -> Result<()> {
        LockToken::lock_token_handler(ctx, amount)
    }

    pub fn unlock_token(ctx: Context<UnlockToken>) -> Result<()> {
        UnlockToken::unlock_token_handler(ctx)
    }

    pub fn unlock_sol(ctx: Context<UnlockSol>) -> Result<()> {
        UnlockSol::unlock_sol_handler(ctx)
    }
    pub fn claim(ctx: Context<Claim>, option: u8) -> Result<()> {
        claim::claim_handler(ctx, option)
    }
    pub fn lock_sol(ctx: Context<LockSol>, level: u8) -> Result<()> {
        LockSol::lock_sol_handler(ctx, level)
    }
    pub fn pop(ctx: Context<Pop>, option: u8, amount: u64) -> Result<()> {
        Pop::pop_handler(ctx, option, amount)
    }
    pub fn deploy(ctx: Context<Deploy>, option: u8, amount: u64) -> Result<()> {
        Deploy::deploy_handler(ctx, option, amount)
    }
}
