use {
    crate::*,
    anchor_spl::token::{Token, TokenAccount},
};

#[derive(Accounts)]
pub struct Claim<'info> {
    #[account(
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

    //  user's SPL token account
    #[account(
        mut, 
        token::mint = ELMNT_ADDRESS.parse::<Pubkey>().unwrap(), 
        token::authority = user,
    )]
    pub elmnt_user: Box<Account<'info, TokenAccount>>,

    //  Global SPL token account
    #[account(
        mut, 
        token::mint = ELMNT_ADDRESS.parse::<Pubkey>().unwrap(), 
        token::authority = vault,
    )]
    pub elmnt_vault: Box<Account<'info, TokenAccount>>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

pub fn claim_handler(ctx: Context<Claim>, option: u8) -> Result<()> {
    
    //  ----------------------------       get rewards    -------------------------------
    let global_pool = &mut ctx.accounts.global_pool;
    let user_pool = &mut ctx.accounts.user_pool;
    let mut reward = 0;
    let _vault_bump = *ctx.bumps.get("vault").unwrap();
    if option == 0 {
        reward = user_pool.claim_reward()?;
    } else {
        let now: i64 = Clock::get()?.unix_timestamp;
        
        let lock_duration = (now - user_pool.stake_token_date) as u64;

        reward = user_pool.token_reward + lock_duration / DAY_SECONDS * TOKEN_LOW_RATE;
        user_pool.stake_token_date = now;
        user_pool.token_reward = 0;
    }
    
    // //  ----------------------------    transfer rewards    -------------------------------
    token_transfer_with_signer(
        ctx.accounts.elmnt_vault.to_account_info(),
        ctx.accounts.vault.to_account_info(),
        ctx.accounts.elmnt_user.to_account_info(),
        ctx.accounts.token_program.to_account_info(),
        &[&[VAULT_AUTHORITY_SEED.as_ref(), &[_vault_bump]]],
        reward,
    )?;

    global_pool.total_token_staked -= reward;

    Ok(())
}
