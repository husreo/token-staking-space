import { program } from 'commander';
import {
    PublicKey
} from '@solana/web3.js';
import { claim, getGlobalInfo, getUserInfo, initProject, initializeUserPool, lockToken, lockSol, setClusterConfig, unlockToken, unlockSol, pop, deploy } from './scripts';

program.version('0.0.1');

programCommand('status')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .action(async (directory, cmd) => {
        const { env, keypair, rpc } = cmd.opts();

        console.log('Solana Cluster:', env);
        console.log('Keypair Path:', keypair);
        console.log('RPC URL:', rpc);
        await setClusterConfig(env, keypair, rpc);

        console.log(await getGlobalInfo());
    });

programCommand('user-status')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .option('-a, --address <string>', 'user pubkey')
    .action(async (directory, cmd) => {
        const { env, keypair, rpc, address } = cmd.opts();
        console.log("user", address);
        console.log('Solana Cluster:', env);
        console.log('Keypair Path:', keypair);
        console.log('RPC URL:', rpc);
        await setClusterConfig(env, keypair, rpc);

        if (address === undefined) {
            console.log("Error User Address input");
            return;
        }
        console.log(await getUserInfo(new PublicKey(address)));
    });

programCommand('init')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .action(async (directory, cmd) => {
        const { env, keypair, rpc } = cmd.opts();

        console.log('Solana Cluster:', env);
        console.log('Keypair Path:', keypair);
        console.log('RPC URL:', rpc);

        await setClusterConfig(env, keypair, rpc);

        await initProject();
    });

programCommand('init-user')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .action(async (directory, cmd) => {
        const { env, keypair, rpc } = cmd.opts();

        console.log('Solana Cluster:', env);
        console.log('Keypair Path:', keypair);
        console.log('RPC URL:', rpc);

        await setClusterConfig(env, keypair, rpc);

        await initializeUserPool();
    });

programCommand('lock')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .option('-m, --mint <number>')
    .action(async (directory, cmd) => {
        const { env, keypair, rpc } = cmd.opts();

        console.log('Solana Cluster:', env);
        console.log('Keypair Path:', keypair);
        console.log('RPC URL:', rpc);

        await setClusterConfig(env, keypair, rpc);
        // if (mint === undefined) {
        //     console.log("Error token amount Input");
        //     return;
        // }

        await lockToken();
    });

programCommand('locksol')
.option('-l, --level <number>')
.action(async (directory, cmd) => {
    const { env, keypair, rpc, level } = cmd.opts();

    console.log('Solana Cluster:', env);
    console.log('Keypair Path:', keypair);
    console.log('RPC URL:', rpc);
    console.log('LEvel:', level);
    if (level === undefined) {
        console.log("Error level");
        return;
    }
    await setClusterConfig(env, keypair, rpc);
    // if (mint === undefined) {
    //     console.log("Error token amount Input");
    //     return;
    // }

    await lockSol(level);
});    

programCommand('unlock')
    .action(async (directory, cmd) => {
        const { env, keypair, rpc } = cmd.opts();

        console.log('Solana Cluster:', env);
        console.log('Keypair Path:', keypair);
        console.log('RPC URL:', rpc);

        await setClusterConfig(env, keypair, rpc);
        await unlockToken();
    });
programCommand('unlocksol')
    .action(async (directory, cmd) => {
        const { env, keypair, rpc } = cmd.opts();

        console.log('Solana Cluster:', env);
        console.log('Keypair Path:', keypair);
        console.log('RPC URL:', rpc);

        await setClusterConfig(env, keypair, rpc);
        await unlockSol();
    });
programCommand('claim')
    .option('-o, --option <number>')
    .action(async (directory, cmd) => {
        const { env, keypair, rpc, option } = cmd.opts();

        console.log('Solana Cluster:', env);
        console.log('Keypair Path:', keypair);
        console.log('RPC URL:', rpc);

        await setClusterConfig(env, keypair, rpc);

        await claim(option);
    });
programCommand('pop')
    .option('-o, --option <number>')
    .option('-a, --amount <number>')
    .action(async (directory, cmd) => {
        const { env, keypair, rpc, option, amount } = cmd.opts();

        console.log('Solana Cluster:', env);
        console.log('Keypair Path:', keypair);
        console.log('RPC URL:', rpc);
        console.log('option:', option);
        console.log('amount',  amount);
        await setClusterConfig(env, keypair, rpc);
        if (amount === undefined) {
            console.log("Error token amount Input");
            return;
        }
        await pop(Number(option), Number(amount));
    });

programCommand('deploy')
    .option('-o, --option <number>')
    .option('-a, --amount <number>')
    .action(async (directory, cmd) => {
        const { env, keypair, rpc, option, amount } = cmd.opts();

        console.log('Solana Cluster:', env);
        console.log('Keypair Path:', keypair);
        console.log('RPC URL:', rpc);
        console.log('option:', option);
        console.log('amount',  amount);
        await setClusterConfig(env, keypair, rpc);
        if (amount === undefined) {
            console.log("Error token amount Input");
            return;
        }
        await deploy(Number(option), Number(amount));
    });

function programCommand(name: string) {
    return program
        .command(name)
        .option('-e, --env <string>', 'Solana cluster env name', 'devnet') //mainnet-beta, testnet, devnet
        .option('-r, --rpc <string>', 'Solana cluster RPC name', 'https://api.devnet.solana.com')
        .option('-k, --keypair <string>', 'Solana wallet Keypair Path', './id.json')
}

program.parse(process.argv);

/*

yarn script init

yarn script init-user -k ../key/dc8.json

yarn script lock -m 3xVwPory1mcY5TmpmCtPC2ezgpHuzLeMLbdGY1DeQLxY -k ../key/dc8.json

yarn script unlock -m 3xVwPory1mcY5TmpmCtPC2ezgpHuzLeMLbdGY1DeQLxY -k ../key/dc8.json

yarn script claim -k ../key/dc8.json

yarn script user-status -a EwUTcnP6nu3rckUCWVut4bu82k8bGuZ1DGnpQt5VsU7m

yarn script status

*/
