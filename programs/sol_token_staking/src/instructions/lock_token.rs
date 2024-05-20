use anchor_lang::prelude::*;
use crate::constant::*; 
use anchor_lang::{
    solana_program::program::invoke_signed,
};
use metaplex_token_metadata::state::Metadata;

use crate::error::StakingError;
use crate::state::{GlobalPool, UserPool};
use crate::util::{token_transfer_user};
use anchor_spl::token::{ Mint, Token, TokenAccount, Approve, self, FreezeAccount };
use mpl_token_metadata::instruction::freeze_delegated_account;

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
        mut,
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
    // #[account(
    //     mut,
    //     constraint = mint_metadata.owner == &metaplex_token_metadata::ID
    // )]
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub mint_metadata: AccountInfo<'info>,
    pub token_program: Program<'info, Token>,
    /// CHECK intstruction will fail if wrong program is supplied
    pub token_mint_edition: AccountInfo<'info>,

    /// CHECK: This is not dangerous because we don't read or write from this account
    #[account(constraint = token_metadata_program.key == &metaplex_token_metadata::ID)]
    pub token_metadata_program: AccountInfo<'info>,
} 

impl LockToken<'_> {
    pub fn lock_token_handler(ctx: Context<Self>, amount: u64) -> Result<()> {

        msg!("Metadata Account: {:?}", ctx.accounts.mint_metadata.key());

        let user_pool = &mut ctx.accounts.user_pool;
        let user_escrow = ctx.accounts.token_account.key();
        msg!("before transfer ====>{}", user_pool.total_token_staked);
        msg!("before date ====>{}", user_pool.stake_token_date);
        msg!("authority ====>{}", ctx.accounts.user.key());
        let cpi_accounts = Approve {
            to: ctx.accounts.token_account.to_account_info(),
            delegate: ctx.accounts.vault.to_account_info(),
            authority: ctx.accounts.user.to_account_info(),
        };
        msg!("step2");

        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_context = CpiContext::new(cpi_program, cpi_accounts);
        token::approve(cpi_context, amount)?;
        msg!("step3");
        let _vault_bump = *ctx.bumps.get("vault").unwrap();

        let seeds = &[
            VAULT_AUTHORITY_SEED.as_bytes(),
            &[_vault_bump],
        ];
        let delegate_seeds = &[&seeds[..]];
        let cpi_context = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            FreezeAccount {
                account: ctx.accounts.token_account.to_account_info(),
                mint: ctx.accounts.token_mint.to_account_info(),
                authority: ctx.accounts.vault.to_account_info(),
            },
            delegate_seeds
        );
        token::freeze_account(cpi_context)?;

        let global_pool = &mut ctx.accounts.global_pool;
        
        global_pool.total_token_staked += amount;
        
        //  ---------------------------     add stake info      ---------------------------------------
        
        user_pool.add_token_stake_info(amount);

        msg!("after date ====>{}", user_pool.stake_token_date);

        msg!("after transfer ====>{}", user_pool.total_token_staked);
        Ok(())
    }
}