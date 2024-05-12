use anchor_lang::prelude::*;
use crate::constant::*;
// use crate::error::StakingError;
use crate::state::{GlobalPool, UserPool};
use crate::util::{token_transfer_user};
use anchor_spl::token::{ Mint, Token, TokenAccount };

#[derive(Accounts)]
pub struct LockToken<'info> {
    #[account(
        mut,
        seeds = [GLOBAL_AUTHORITY_SEED.as_ref()],
        bump
    )]
    pub global_pool: Account<'info, GlobalPool>,

    // vault
    #[account(
        seeds = [VAULT_AUTHORITY_SEED.as_ref()],
        bump
    )]
    /// CHECK instruction will fail if wrong edition is supplied
    pub vault: AccountInfo<'info>,
    
    //  Global SPL token account
    #[account(
        mut, 
        token::mint = ELMNT_ADDRESS.parse::<Pubkey>().unwrap(), 
        token::authority = vault,
    )]
    pub elmnt_vault: Box<Account<'info, TokenAccount>>,
    //  PDA that stores user's stake info
    #[account(
        mut,
        seeds = [user.key().as_ref(), USER_POOL_SEED.as_ref()],
        bump,
    )]
    pub user_pool: Box<Account<'info, UserPool>>,

    #[account(mut)]
    pub user: Signer<'info>,
    //  user's nft token account
    #[account(
        mut, 
        token::mint = token_mint, 
        token::authority = user,
    )]
    pub token_account: Box<Account<'info, TokenAccount>>,
    pub token_mint: Box<Account<'info, Mint>>,
    
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
} 

impl LockToken<'_> {
    pub fn lock_token_handler(ctx: Context<Self>, amount: u64) -> Result<()> {
        let user_pool = &mut ctx.accounts.user_pool;
        let user = ctx.accounts.user.key();
        //  --------------------------- transfer SPL token to loyalty ata   ---------------------------------------
         msg!("before transfer ====>{}", user_pool.total_token_staked);
         msg!("before date ====>{}", user_pool.stake_token_date);
        token_transfer_user(
            ctx.accounts.token_account.to_account_info(),      //from
            ctx.accounts.user.to_account_info(),            //authority
            ctx.accounts.elmnt_vault.to_account_info(),   //to
            ctx.accounts.token_program.to_account_info(),
            amount
        )?;
        //  ----------------------------       update global info    -------------------------------
        
        let global_pool = &mut ctx.accounts.global_pool;
        
        global_pool.total_token_staked += amount;
        
        //  ---------------------------     add stake info      ---------------------------------------
        
        user_pool.add_token_stake_info(amount);

        msg!("after date ====>{}", user_pool.stake_token_date);

        msg!("after transfer ====>{}", user_pool.total_token_staked);
        Ok(())
    }
}