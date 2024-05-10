import * as anchor from '@project-serum/anchor';
import {
    PublicKey,
    Connection,
    SystemProgram, 
    SYSVAR_RENT_PUBKEY,
    Transaction,
    LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import { ELMNT_DECIMAL } from './constants';
import BN from 'bn.js';
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from '@solana/spl-token';

import { getAssociatedTokenAccount } from './util';
import { GLOBAL_AUTHORITY_SEED, ELMNT_ADDRESS, USER_POOL_SEED, VAULT_AUTHORITY_SEED } from './constants';

export const createInitializeTx = async (
    userAddress: PublicKey,
    program: anchor.Program,
) => {
    const [globalPool, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId);
    console.log("globalPool: ", globalPool.toBase58());

    const txId = await program.methods
        .initialize()
        .accounts({
            admin: userAddress,
            globalPool,
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY
        })
        .transaction();

    return txId;
}

export const createInitUserTx = async (
    userAddress: PublicKey,
    program: anchor.Program,
) => {
    const [userPool, bump] = PublicKey.findProgramAddressSync(
        [userAddress.toBuffer(), Buffer.from(USER_POOL_SEED)],
        program.programId);

    console.log("userPool: ", userPool.toBase58());

    const txId = await program.methods
        .inituser()
        .accounts({
            user: userAddress,
            userPool,
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY
        })
        .transaction();

    return txId;
}

export const createLockTokenTx = async (
    userAddress: PublicKey,
    program: anchor.Program,
    connection: Connection,
    amount: number
) => {
    const [globalPool, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId);
    console.log("globalPool: ", globalPool.toBase58());

    const [vault, vault_bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(VAULT_AUTHORITY_SEED)],
        program.programId);
    console.log("vault: ", vault.toBase58());

    const [userPool, _user_bump] = PublicKey.findProgramAddressSync(
        [userAddress.toBuffer(), Buffer.from(USER_POOL_SEED)],
        program.programId);
    console.log("userPool: ", userPool.toBase58());

    let tokenAccount = await getAssociatedTokenAccount(userAddress, ELMNT_ADDRESS);
    console.log("user address", userAddress);
    
    console.log("tokenAccount: ", tokenAccount.toBase58());

    let elmntVault = await getAssociatedTokenAccount(vault, ELMNT_ADDRESS);
    
    const tx = new Transaction();

    const txId = await program.methods
        .lockToken(new BN(amount))
        .accounts({
            globalPool,
            vault,
            elmntVault,
            userPool,
            user: userAddress,
            tokenAccount,
            tokenMint: ELMNT_ADDRESS,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId
        })
        .transaction();

    tx.add(txId);

    return tx;
}

export const createUnLockTokenTx = async (
    userAddress: PublicKey,
    program: anchor.Program,
) => {
    const [globalPool, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId);
    console.log("globalPool: ", globalPool.toBase58());

    const [vault, vault_bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(VAULT_AUTHORITY_SEED)],
        program.programId);
    console.log("vault: ", vault.toBase58());

    const [userPool, _user_bump] = PublicKey.findProgramAddressSync(
        [userAddress.toBuffer(), Buffer.from(USER_POOL_SEED)],
        program.programId);
    console.log("userPool: ", userPool.toBase58());

    let tokenAccount = await getAssociatedTokenAccount(userAddress, ELMNT_ADDRESS);
    console.log("user address", userAddress);
    
    console.log("tokenAccount: ", tokenAccount.toBase58());

    let elmntVault = await getAssociatedTokenAccount(vault, ELMNT_ADDRESS);
    
    const tx = new Transaction();

    const txId = await program.methods
        .unlockToken()
        .accounts({
            globalPool,
            vault,
            elmntVault,
            userPool,
            user: userAddress,
            tokenAccount,
            tokenMint: ELMNT_ADDRESS,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId
        })
        .transaction();

    tx.add(txId);

    return tx;
}

export const createPopTx = async (
    user: PublicKey,
    program: anchor.Program,
    amount: number
) => {
    const [globalPool, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId);
    console.log("globalPool: ", globalPool.toBase58());

    const [vault, vault_bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(VAULT_AUTHORITY_SEED)],
        program.programId);
    console.log("vault: ", vault.toBase58());

    const [userPool, _user_bump] = PublicKey.findProgramAddressSync(
        [user.toBuffer(), Buffer.from(USER_POOL_SEED)],
        program.programId);
    console.log("userPool: ", userPool.toBase58());

    let tokenAccount = await getAssociatedTokenAccount(user, ELMNT_ADDRESS);
    console.log("user address", user);
    
    console.log("tokenAccount: ", tokenAccount.toBase58());

    let elmntVault = await getAssociatedTokenAccount(vault, ELMNT_ADDRESS);
    
    const tx = new Transaction();

    amount = amount * ELMNT_DECIMAL;

    const txId = await program.methods
        .pop(new BN(amount))
        .accounts({
            globalPool,
            vault,
            elmntVault,
            userPool,
            user,
            tokenAccount,
            tokenMint: ELMNT_ADDRESS,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId
        })
        .transaction();

    tx.add(txId);

    return tx;
}

export const createDeployTx = async (
    user: PublicKey,
    program: anchor.Program,
    amount: number
) => {
    const [globalPool, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId);
    console.log("globalPool: ", globalPool.toBase58());

    const [vault, vault_bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(VAULT_AUTHORITY_SEED)],
        program.programId);
    console.log("vault: ", vault.toBase58());

    const [userPool, _user_bump] = PublicKey.findProgramAddressSync(
        [user.toBuffer(), Buffer.from(USER_POOL_SEED)],
        program.programId);
    console.log("userPool: ", userPool.toBase58());

    let tokenAccount = await getAssociatedTokenAccount(user, ELMNT_ADDRESS);
    console.log("user address", user);
    
    console.log("tokenAccount: ", tokenAccount.toBase58());

    let elmntVault = await getAssociatedTokenAccount(vault, ELMNT_ADDRESS);
    
    const tx = new Transaction();

    amount = amount * ELMNT_DECIMAL;
    const txId = await program.methods
        .deploy(new BN(amount))
        .accounts({
            globalPool,
            vault,
            elmntVault,
            userPool,
            user,
            tokenAccount,
            tokenMint: ELMNT_ADDRESS,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId
        })
        .transaction();

    tx.add(txId);

    return tx;
}

export const createClaimTx = async (
    userAddress: PublicKey,
    program: anchor.Program,
) => {
    const [globalPool, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId);
    console.log("globalPool: ", globalPool.toBase58());

    const [vault, vault_bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(VAULT_AUTHORITY_SEED)],
        program.programId);
    console.log("vault: ", vault.toBase58());

    const [userPool, _user_bump] = PublicKey.findProgramAddressSync(
        [userAddress.toBuffer(), Buffer.from(USER_POOL_SEED)],
        program.programId);
    console.log("userPool: ", userPool.toBase58());

    let elmntUser = await getAssociatedTokenAccount(userAddress, ELMNT_ADDRESS);
    
    let elmntVault = await getAssociatedTokenAccount(vault, ELMNT_ADDRESS);
    console.log("soulVault: ", elmntVault.toBase58());
    console.log("soulUser: ", elmntUser.toBase58());

    const tx = new Transaction();

    const txId = await program.methods
        .claim()
        .accounts({
            globalPool,
            vault,
            userPool,
            user: userAddress,
            elmntUser,
            elmntVault,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId
        })
        .transaction();

    tx.add(txId);

    return tx;
}
