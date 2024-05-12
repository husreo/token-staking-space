use crate::*;
use anchor_spl::token::{Mint, Token, TokenAccount};

#[derive(Accounts)]
pub struct UnlockToken<'info> {
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
 
impl UnlockToken<'_> {
    pub fn unlock_token_handler(ctx: Context<Self>) -> Result<()> {
        let  user_pool = &mut ctx.accounts.user_pool;

        let global_pool = &mut ctx.accounts.global_pool;
        // require!(user_pool.total_token_staked == 0, StakingError::InvalidCollection);

        let _vault_bump = *ctx.bumps.get("vault").unwrap();
        //  Update reward
        let now: i64 = Clock::get()?.unix_timestamp;
                
        if user_pool.stake_token_date != 0 {
            let lock_duration = (now - user_pool.stake_token_date) as u64;
            user_pool.token_reward += lock_duration / DAY_SECONDS * TOKEN_LOW_RATE;
        }
        msg!("reward =======>{}", user_pool.token_reward);
        token_transfer_with_signer(
            ctx.accounts.elmnt_vault.to_account_info(),
            ctx.accounts.vault.to_account_info(),
            ctx.accounts.token_account.to_account_info(),
            ctx.accounts.token_program.to_account_info(),
            &[&[VAULT_AUTHORITY_SEED.as_ref(), &[_vault_bump]]],
            (user_pool.total_token_staked + user_pool.token_reward)
        )?;

        global_pool.total_token_staked -= user_pool.total_token_staked;
        user_pool.remove_token_stake_info();
        Ok(())
    }
}