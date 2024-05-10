import { Program, web3 } from '@project-serum/anchor';
import * as anchor from '@project-serum/anchor';
import { GLOBAL_AUTHORITY_SEED, PROGRAM_ID, USER_POOL_SEED, ELMNT_DECIMAL } from './constants';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import axios from 'axios';
import {
    createInitUserTx,
    createInitializeTx,
    createLockTokenTx,
    createUnLockTokenTx,
    createClaimTx,
    createPopTx,
    createDeployTx
} from './scripts';
import { GlobalPool, UserPool } from './types';
import { getAssociatedTokenAccount } from './util';
// Address of the deployed program.
let programId = new anchor.web3.PublicKey(PROGRAM_ID);

export const initProject = async (
    payer: PublicKey,
    program: Program,
    provider: anchor.Provider
) => {
    try {
        if (provider.sendAndConfirm === undefined) {
            console.log("Undefined Provider!");
            return;
        } else {
            const tx = await createInitializeTx(payer, program);
    
            const txId = await provider.sendAndConfirm(tx, [], {
                commitment: "confirmed",
            });
    
            console.log("txHash: ", txId);
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * Initialize user pool
 */
export const initializeUserPool = async (
    payer: PublicKey,
    program: Program,
    provider: anchor.Provider
) => {
    try {
        if (provider.sendAndConfirm === undefined) {
            console.log("Provider Undefined!");
            return
        } else {
            const tx = await createInitUserTx(payer, program);
            const txId = await provider.sendAndConfirm(tx, [], {
                commitment: "confirmed",
            });
    
            console.log("txHash: ", txId);
        }

    } catch (e) {
        console.log(e);
    }
}

export const lockToken = async (
    payer: PublicKey,
    program: Program,
    provider: anchor.Provider,
    connection: Connection,
    amount: number
) => {
    try {
        if (provider.sendAndConfirm === undefined) {
            console.log("Undefined provider!");
            return
        }
        const tx = await createLockTokenTx(payer, program, connection, amount * ELMNT_DECIMAL);
        const txId = await provider.sendAndConfirm(tx, [], {
            commitment: "confirmed",
        });

        console.log("txHash: ", txId);
        // const simulationResult = await solConnection.simulateTransaction(tx);
        // console.log("tx history!", simulationResult);
        
    } catch (e) {
        console.log(e);
    }
       
}

export const unlockToken = async (
    payer: PublicKey,
    program: Program,
    provider: anchor.Provider,
) => {
    try {
        if (provider.sendAndConfirm === undefined) {
            console.log("Undefined provider!");
            return
        }
        const tx = await createUnLockTokenTx(payer, program);

        const txId = await provider.sendAndConfirm(tx, [], {
            commitment: "confirmed",
        });

        console.log("txHash: ", txId);
        
    } catch (e) {
        console.log(e);
    }
}

export const claim = async (
    payer: PublicKey,
    program: anchor.Program,
    provider: anchor.Provider,
    connection: Connection
) => {
    try {
        if (provider.sendAndConfirm === undefined) {
            console.log("Undefined provider!");
            return
        }
        console.log("claim transaction!");
        
        const tx = await createClaimTx(payer, program);
        const txId = await provider.sendAndConfirm(tx, [], {
            commitment: "confirmed",
        });

        console.log("txHash: ", txId);
        const simulationResult = await connection.simulateTransaction(tx);
        console.log(simulationResult);
    } catch (e) {
        console.log(e);
    }
}

export const pop = async (
    amount: number,
    provider: anchor.Provider,
    program: Program,
    payer: PublicKey
) => {
    try {
        if (provider.sendAndConfirm === undefined) {
            console.log("Undefined provider!");
            return
        }
        const tx = await createPopTx(payer, program, amount);

        const txId = await provider.sendAndConfirm(tx, [], {
            commitment: "confirmed",
        });

        console.log("txHash: ", txId);
    } catch (e) {
        console.log(e);
    }
}

export const deploy = async (
    amount: number,
    provider: anchor.Provider,
    program: Program,
    payer: PublicKey
) => {
    try {
        if (provider.sendAndConfirm === undefined) {
            console.log("Undefined provider!");
            return
        }
        const tx = await createDeployTx(payer, program, amount);

        const txId = await provider.sendAndConfirm(tx, [], {
            commitment: "confirmed",
        });

        console.log("txHash: ", txId);
    } catch (e) {
        console.log(e);
    }
}

export const getGlobalState = async (program: anchor.Program): Promise<GlobalPool | null> => {

    const [globalPool, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId);

    try {
        let globalState = await program.account.globalPool.fetch(globalPool, "confirmed");

        return globalState as unknown as GlobalPool;
    }
    catch
    {
        return null;
    }
}

export const getGlobalInfo = async (
    program: Program
) => {
    
    const globalPool = await getGlobalState(program);
    
    if (!globalPool) {
        console.log("Can't find GlobalPool");
        return
    }
    
    return globalPool;
}

export const getUserPoolState = async (
    userAddress: PublicKey,
    program: Program
): Promise<UserPool | null> => {

    if (!userAddress) return null;

    const [userPoolKey, bump] = PublicKey.findProgramAddressSync(
        [userAddress.toBuffer(), Buffer.from(USER_POOL_SEED)],
        program.programId);

    try {
        let poolState = await program.account.userPool.fetch(userPoolKey, "confirmed") as unknown as UserPool;

        return poolState;
    }
    catch
    {
        return null;
    }
}

export const getUserInfo = async (
    userAddress: PublicKey,
    program: Program
) => {
    const userPool = await getUserPoolState(userAddress, program);
    if (!userPool) {
        console.log("Can't find user pool!");
        
        return undefined
    }
    return {
        user: userPool.user,
        totalTokenStaked: userPool.totalTokenStaked,
        stakeTokenDate: userPool.stakeTokenDate,
        tokenReward: userPool.tokenReward
    };
}

export const getTokenBalance = async (walletAddress:PublicKey, tokenMintAddress:PublicKey, connection: Connection) => {
    const ata = await getAssociatedTokenAccount(walletAddress, tokenMintAddress);
    const info = await connection.getTokenAccountBalance(ata);
    if (info.value.uiAmount == null) throw new Error('No balance found');
    return info.value.uiAmount;
}
