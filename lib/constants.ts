
import {
    PublicKey,
} from "@solana/web3.js";

export const DEPLOY_URL = `https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsteven-tey%2Fprecedent&project-name=precedent&repository-name=precedent&demo-title=Precedent&demo-description=An%20opinionated%20collection%20of%20components%2C%20hooks%2C%20and%20utilities%20for%20your%20Next%20project.&demo-url=https%3A%2F%2Fprecedent.dev&demo-image=https%3A%2F%2Fprecedent.dev%2Fopengraph-image&env=GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,NEXTAUTH_SECRET&envDescription=How%20to%20get%20these%20env%20variables%3A&envLink=https%3A%2F%2Fgithub.com%2Fsteven-tey%2Fprecedent%2Fblob%2Fmain%2F.env.example&stores=%5B%7B"type"%3A"postgres"%7D%5D`;
export const GLOBAL_AUTHORITY_SEED = "global-sol-token-authority";
export const VAULT_AUTHORITY_SEED = "vault-space-authority";
export const USER_POOL_SEED = "user-pool-facon-io-seed";       
export const ADMIN_WALLET = "H9kSCxTLLKJ3C7wJWzTsewVPQNwEAVBGTXJhZb5KNPMU";
export const PROGRAM_ID = new PublicKey("8Xgoq51mWQ2vhAQrxjEhuZBpuMggrau2e7kaBnAHn2Dm");
    
export const MILSECS_IN_DAY = (60 * 60 * 24);

export const ELMNT_ADDRESS = new PublicKey("5CY4inXAWEKDENqJ5ZLNaTYX8gzjHZNXimuj7VmFmVi6");
export const ELMNT_DECIMAL = 1000000;

// Define the minimum lock duration in seconds (1 month = 30 days)
export const MIN_LOCK_DURATION_SECONDS = 30 * 24 * 60 * 60;



