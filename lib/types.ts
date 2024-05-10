import * as anchor from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js'

export interface GlobalPool {
    admin: PublicKey,
    totalTokenStaked: anchor.BN,
    totalSolStaked: anchor.BN
}

export interface UserPool {
    user: PublicKey,
    totalTokenStaked: anchor.BN,
    stakeTokenDate: anchor.BN,
    tokenReward: anchor.BN
}

