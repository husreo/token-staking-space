use crate::*;
use anchor_spl::token::{Mint, Token, TokenAccount};
use anchor_lang::solana_program::program::{ invoke_signed };

#[derive(Accounts)]
pub struct Pop<'info> {
    #[account(
        mut,
        seeds = [GLOBAL_AUTHORITY_SEED.as_ref()],
        bump
    )]
    pub global_pool: Account<'info, GlobalPool>,

    //  vault
    #[account(
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
 
impl Pop<'_> {
    pub fn pop_handler(ctx: Context<Self>, option: u8, amount: u64) -> Result<()> {
        let global_pool = &mut ctx.accounts.global_pool;
        let _vault_bump = *ctx.bumps.get("vault").unwrap();

        if option == 0 {
            token_transfer_with_signer(
                ctx.accounts.elmnt_vault.to_account_info(),
                ctx.accounts.vault.to_account_info(),
                ctx.accounts.token_account.to_account_info(),
                ctx.accounts.token_program.to_account_info(),
                &[&[VAULT_AUTHORITY_SEED.as_ref(), &[_vault_bump]]],
                amount
            )?;
            global_pool.total_token_staked -= amount;
        }else{
            invoke_signed(
                &solana_program::system_instruction::transfer(&ctx.accounts.vault.key(), &ctx.accounts.user.key(),amount),
                &[
                    ctx.accounts.vault.to_account_info(),
                    ctx.accounts.user.to_account_info(),
                    ctx.accounts.system_program.to_account_info(),
                ],
                &[&[VAULT_AUTHORITY_SEED.as_ref(), &[_vault_bump]]]
            )?;
            global_pool.total_sol_staked -= amount;
        }

        Ok(())
    }
}