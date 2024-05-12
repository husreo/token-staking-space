use crate::*;
// use anchor_lang::prelude::*;
use crate::constant::*;
// use crate::StakingError::{ExceedMaxReward, ExceedMaxCount};
use anchor_spl::token::{Mint, Token, TokenAccount};
// use crate::error::StakingError;
use crate::state::{ GlobalPool, UserPool };
use anchor_lang::solana_program::program::{ invoke_signed };

#[derive(Accounts)]
pub struct UnlockSol<'info> {
    #[account(
        mut,
        seeds = [GLOBAL_AUTHORITY_SEED.as_ref()],
        bump
    )]
    pub global_pool: Account<'info, GlobalPool>,

    //  vault
    #[account(
        mut,
        seeds = [VAULT_AUTHORITY_SEED.as_ref()],
         bump
        )]
    /// CHECK instruction will fail if wrong edition is supplied
    pub vault: AccountInfo<'info>,

    //  PDA that stores user's stake info
    #[account(
        mut,
        seeds = [user.key().as_ref(), USER_POOL_SEED.as_ref()],
        bump,
    )]
    pub user_pool: Box<Account<'info, UserPool>>,

    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        mut, 
        token::mint = token_mint, 
        token::authority = user,
    )]
    pub token_account: Box<Account<'info, TokenAccount>>,
    pub token_mint: Box<Account<'info, Mint>>,

    //  Global SPL token account
    #[account(
        mut, 
        token::mint = ELMNT_ADDRESS.parse::<Pubkey>().unwrap(), 
        token::authority = vault,
    )]
    pub elmnt_vault: Box<Account<'info, TokenAccount>>,
    pub system_program: Program<'info, System>,

    pub token_program: Program<'info, Token>
}

impl UnlockSol<'_> {
    pub fn unlock_sol_handler(ctx: Context<Self>) -> Result<()> {
        let user_pool = &mut ctx.accounts.user_pool;
        let global_pool = &mut ctx.accounts.global_pool;

        let _vault_bump = *ctx.bumps.get("vault").unwrap();

        
        let (token_amount, sol_amount) =  user_pool.remove_sol_stake_info()?;
        if sol_amount == 0 {
            return err!(StakingError::ExceedMaxCount);
        }

        if user_pool.total_sol_staked < sol_amount || user_pool.total_token_staked < token_amount {
            return err!(StakingError::ExceedMaxCount);
        }
        
        invoke_signed(
            &solana_program::system_instruction::transfer(&ctx.accounts.vault.key(), &ctx.accounts.user.key(),sol_amount),
            &[
                ctx.accounts.vault.to_account_info(),
                ctx.accounts.user.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
            &[&[VAULT_AUTHORITY_SEED.as_ref(), &[_vault_bump]]]
        )?;

        token_transfer_with_signer(
            ctx.accounts.elmnt_vault.to_account_info(),
            ctx.accounts.vault.to_account_info(),
            ctx.accounts.token_account.to_account_info(),
            ctx.accounts.token_program.to_account_info(),
            &[&[VAULT_AUTHORITY_SEED.as_ref(), &[_vault_bump]]],
            token_amount
        )?;

        resize_account(
            user_pool.to_account_info().clone(),
            32 + 8 + 8 + 8 + 8 + 4 + user_pool.sol_stake_data.len() * (8 + 4 + 1),
            ctx.accounts.user.to_account_info().clone(),
            ctx.accounts.system_program.to_account_info().clone(),
        )?;
        global_pool.total_sol_staked -= sol_amount;
        global_pool.total_token_staked -= token_amount;
        Ok(())
    }
}
