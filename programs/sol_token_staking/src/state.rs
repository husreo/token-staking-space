use crate::*;

/**
 * Global pool stores admin address
 */
#[account]
#[derive(Default)]
pub struct GlobalPool {
    pub admin: Pubkey,     // 32
    pub total_token_staked: u64, // 8
    pub total_sol_staked: u64, // 8
}

impl GlobalPool {
    pub const DATA_SIZE: usize = 32 + 8 + 8;
} 

#[account]
#[derive(Default)]
pub struct UserPool{
    pub user: Pubkey, //32
    pub total_token_staked: u64, // 8
    pub total_sol_staked: u64, // 8
    pub stake_token_date: i64, //8
    pub token_reward: u64, //8
    pub sol_stake_data: Vec<SolStakeInfo> //4
}

impl UserPool{
    pub const DATA_SIZE: usize = 32 + 8 + 8 + 8 + 8 + 4;

    //  Add new token StakeInfo to vector
    pub fn add_token_stake_info(&mut self, amount: u64) -> Result<()> {
        //  Add stake amount
        msg!("befor stake data: token ===> {}, reward ===> {}, date ===> {}", self.total_token_staked,self.token_reward , self.stake_token_date);
        self.total_token_staked += amount;
        //  Update reward
        let now: i64 = Clock::get()?.unix_timestamp;
        
        if self.stake_token_date != 0 {
            let lock_duration = (now - self.stake_token_date) as u64;
            self.token_reward += lock_duration / DAY_SECONDS * TOKEN_LOW_RATE;
        }
        // Update stake date
        self.stake_token_date = now;
        msg!("after stake data: token ===> {}, reward ===> {}, date ===> {}", self.total_token_staked,self.token_reward , self.stake_token_date);
        Ok(())
    }

    pub fn add_sol_stake_info(&mut self, level: u8) -> Result<()> {
        //  Add stake amount
        msg!("level =>>>>>>>>>>>>>>>>>>>>>{}", level);

        self.total_sol_staked += SOL_AMOUNT;
        //  Update Sol Stake Data
        let mut end_date: i64 = 0;
        let now: i64 = Clock::get()?.unix_timestamp;
        end_date = now + LOCK_PERIOD[level as usize] * (DAY_SECONDS as i64);
        msg!("now date =>>>>>>>>>>>>>>>>>>>>>{}", now);
        msg!("end date =>>>>>>>>>>>>>>>>>>>>>{}", end_date);
        self.sol_stake_data.push(SolStakeInfo {
            level,
            end_date,
            claimed: false
        });

        Ok(())
    }

    pub fn remove_token_stake_info(&mut self) -> Result<()> {
        let now: i64 = Clock::get()?.unix_timestamp;

        // Format total token
        self.total_token_staked = 0;
        // Format date
        self.stake_token_date = now;
        // Formate reward
        self.token_reward = 0;

        Ok(())
    }

    pub fn claim_reward(&mut self) -> Result<(u64)> {
        let mut reward = 0;
        let now: i64 = Clock::get()?.unix_timestamp;

        let mut index = 0;
        while index < self.sol_stake_data.len() {
            if self.sol_stake_data[index].end_date <= now {
                if self.sol_stake_data[index].claimed {
                    let lock_period = (now - self.sol_stake_data[index].end_date) as u64;
                    reward += lock_period / DAY_SECONDS * SOL_LOW_RATE;
                } else {
                    reward += TOKEN_AMOUNT + TOKEN_AMOUNT * REWARD_RATE[self.sol_stake_data[index].level as usize] / 100;
                }
                self.sol_stake_data[index].end_date = now;
            } else {
                index += 1;
            }
        }
        Ok((reward))
    }

    pub fn remove_sol_stake_info(&mut self) -> Result<(u64, u64)> {
        let mut sol_amount  = 0;
        let mut token_amount: u64  = 0;
        // let mut 
        let now: i64 = Clock::get()?.unix_timestamp;

        let mut index = 0;
        while index < self.sol_stake_data.len() {
            if self.sol_stake_data[index].end_date <= now {
                if self.sol_stake_data[index].claimed {
                    let lock_period = (now - self.sol_stake_data[index].end_date) as u64;
                    token_amount += lock_period / DAY_SECONDS * SOL_LOW_RATE;
                }else {
                    token_amount += TOKEN_AMOUNT + TOKEN_AMOUNT * REWARD_RATE[self.sol_stake_data[index].level as usize] / 100;
                }
                sol_amount += SOL_AMOUNT;
                self.sol_stake_data.swap_remove(index);
            } else {
                index += 1;
            }
        }
        self.total_sol_staked -= sol_amount;
        Ok((token_amount, sol_amount))
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Default, Clone)]
pub struct SolStakeInfo {
    //  sol amount
    pub level: u8, // 4
    //  Start time
    pub end_date: i64, // 8,
    pub claimed: bool // 1
}

impl SolStakeInfo {
    pub const DATA_SIZE: usize = 8 + 4 + 1;
}