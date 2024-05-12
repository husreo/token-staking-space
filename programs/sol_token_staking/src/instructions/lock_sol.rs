use crate::*;
use crate::state::{GlobalPool, UserPool, SolStakeInfo};
use anchor_lang::solana_program::program::{ invoke };

#[derive(Accounts)]

pub struct LockSol<'info> {
    #[account(
        mut,
        seeds = [GLOBAL_AUTHORITY_SEED.as_ref()],
        bump
    )]
    pub global_pool: Account<'info, GlobalPool>,

    //  PDA that stores user's stake info
    #[account(
        mut,
        seeds = [user.key().as_ref(), USER_POOL_SEED.as_ref()],
        bump,
    )]
    pub user_pool: Box<Account<'info, UserPool>>,

    #[account(
        mut,
        seeds = [VAULT_AUTHORITY_SEED.as_ref()],
        bump
    )]
    /// CHECK instruction will fail if wrong edition is supplied
    pub vault: AccountInfo<'info>,
    
    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

impl LockSol<'_> {
    pub fn lock_sol_handler(ctx: Context<Self>, level: u8) -> Result<()>{
        let user_pool = &mut ctx.accounts.user_pool;
        let global_pool = &mut ctx.accounts.global_pool;

        msg!("Transfer Amount: {}", SOL_AMOUNT);
    
        let ix = solana_program::system_instruction::transfer(
            &ctx.accounts.user.to_account_info().key(),
            &ctx.accounts.vault.to_account_info().key(),
            SOL_AMOUNT,
        );
        invoke(&ix, 
            &[ctx.accounts.user.to_account_info().clone(),
            ctx.accounts.vault.to_account_info().clone(),
            ctx.accounts.system_program.to_account_info()],
        )?;

        let data_len = user_pool.to_account_info().data_len();

        resize_account(
            user_pool.to_account_info().clone(),
            data_len + SolStakeInfo::DATA_SIZE,
            ctx.accounts.user.to_account_info().clone(),
            ctx.accounts.system_program.to_account_info().clone()
        )?;

         //  ----------------------------       update global info    -------------------------------
        msg!("user_pool_data before: ========>{}", user_pool.total_sol_staked);
        msg!("global_pool_data before: ========>{}", global_pool.total_sol_staked);

        global_pool.total_sol_staked += SOL_AMOUNT;
        user_pool.add_sol_stake_info(level);
        msg!("user_pool_data: ========>{}", user_pool.total_sol_staked);
        msg!("user_pool_data: ========>{}", global_pool.total_sol_staked);
        Ok(())
    }
}