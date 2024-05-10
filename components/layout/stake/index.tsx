"use client";
import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react"
import { getGlobalInfo, initializeUserPool, getUserInfo, getTokenBalance, lockToken, unlockToken, claim, pop, deploy } from "@/lib/instructions";
import Image from "next/image";
import Band from "public/images/band-falcon.jpg";
import Point from "public/images/point.png";
import Falcon from "public/images/spacefalcon.png";
import { useEffect, useState } from "react";
import * as anchor from "@project-serum/anchor";
import idl from "./idl.json"
import { PROGRAM_ID, ELMNT_DECIMAL, ELMNT_ADDRESS } from "@/lib/constants";
import { GlobalPool, UserPool } from "@/lib/types";
import { ADMIN_WALLET, MILSECS_IN_DAY } from "@/lib/constants";
import LoadingSpin from "react-loading-spin";

export default function StakeView() {
  const [program, setProgram] = useState<anchor.Program>()
  const [global, setGlobalPool] = useState<GlobalPool>();
  const [user, setUserPool] = useState<UserPool>();
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [amount, setAmount] = useState<string>();
  const [popamount, setPopAmount] = useState<string>();
  const [deamount, setDeAmount] = useState<string>();
  const [reward, setReward] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [erroralert, setErroralert] = useState(false);
  const [errormsg, setErrormsg] = useState('');
  const { connection } = useConnection()
  const wallet = useAnchorWallet();

  const stakeToken = async () => {
     if (!wallet || !program || !amount) {
      console.log("Invalid staking!");
      showerror("Invalid staking!");
      return
    }
    if (isNaN(Number(amount))) {
      showerror("Invalid value!, Input number");
      return
    }
    setLoading(true);
    const provider = anchor.getProvider();
    await lockToken(wallet?.publicKey, program, provider, connection, Number(amount));
    setLoading(false);

    await refreshdata(program)
  }

  const unStake = async () => {
    if (!wallet || !program) {
      console.log("Invalid unstaking!");
      setErroralert(true);
      setErrormsg("Invalid unstaking!");
      return
    }
    if (user?.totalTokenStaked.toNumber() == 0) {
      showerror("Nothing to unstake");
      return
    }
    setLoading(true);
    const provider = anchor.getProvider();
    try {
      await unlockToken(wallet.publicKey, program, provider);
      setLoading(false);

      await refreshdata(program);
    } catch (error) {
      console.log("Unlock error", error);
    }
  }

  const claimReward = async () => {
    
    if (!wallet || !program) {
      console.log("Invalid Claim!");
      showerror("Invalid Claim!");
      return
    }
    setLoading(true);

    const user = await getUserInfo(wallet.publicKey, program);
    const provider = anchor.getProvider();
    setUserPool(user);
    if (!user) {
      initializeUserPool(wallet?.publicKey, program, provider);
    }
    if (user?.tokenReward) {
      let reward = user?.tokenReward.toNumber() + (Math.floor((new Date().valueOf()) / 1000) - user?.stakeTokenDate.toNumber()) / MILSECS_IN_DAY * user?.totalTokenStaked.toNumber() / 365;
      if (Math.floor(reward/ELMNT_DECIMAL) == 0) {
        setLoading(false);
        showerror("Nothing to claim!");
        return
      }
    }

    try {
      
      await claim(wallet?.publicKey, program, provider, connection);
    } catch (error) {
      showerror("Invalid Error!");
    }
    setLoading(false);

    await refreshdata(program);
  }

  const popToken = async () => {
    if (!popamount || !program || !wallet) {
      console.log("Invalid Pop!");
      showerror("Invalid Pop!");
      return
    }
    if (isNaN(Number(popamount))) {
      console.log("Invalid value!, Input number");
      return
    }
    setLoading(true);
    const provider = anchor.getProvider();
    await pop(Number(popamount), provider, program, wallet?.publicKey);
    setLoading(false);

    await refreshdata(program);
  }

  const depositeToken = async () => {
    
    if (!deamount || !program || !wallet) {
      console.log("Invalid Deposite!");
      showerror("Invalid Deposite!");
      return
    }
    if (isNaN(Number(deamount))) {
      showerror("Invalid value!, Input number");
      return
    }
    setLoading(true);
    const provider = anchor.getProvider();

    deploy(Number(deamount), provider, program, wallet?.publicKey)
    setLoading(false);

    await refreshdata(program);

  }
  //Refresh status
  const refreshdata = async (program: anchor.Program) => {

    if (!program) {
      console.log("can't refresh - no program");
      return
    } else

    // get globalpool data
    (async () => {
      const global = await getGlobalInfo(program);
      if (!global) {
        console.log("can't refres - Cannot find global pool!");
        return
      }
      setGlobalPool(global);
    })();

    if (!wallet) {
      console.log("can't refres no wallet")
      return
    }
    // calculate token balance
    (async () => {
      const balance = await getTokenBalance(wallet.publicKey, ELMNT_ADDRESS, connection);
      setTokenBalance(balance);
    })();

    // get userpool data
    (async () => {
      const user = await getUserInfo(wallet.publicKey, program);
      const provider = anchor.getProvider();
      setUserPool(user);
      if (!user) {
        initializeUserPool(wallet?.publicKey, program, provider);
      }
      if (user?.tokenReward) {
        let reward = user?.tokenReward.toNumber() + (Math.floor((new Date().valueOf()) / 1000) - user?.stakeTokenDate.toNumber()) / MILSECS_IN_DAY * user?.totalTokenStaked.toNumber() / 365;
        console.log("reward", reward.toFixed(6));
        
        setReward(reward.toFixed(6));
      }
    })();
  }

  const showerror = (msg: string) => {
    setErroralert(true);
    setErrormsg(msg);
  }
  useEffect(() => {
    if (wallet) {
      const provider = new anchor.AnchorProvider(connection, wallet, {});
      anchor.setProvider(provider);
      const program = new anchor.Program(idl as anchor.Idl, PROGRAM_ID)
      setProgram(program);

      //global Data
      (async () => {
        const global = await getGlobalInfo(program);
        if (!global) {
          console.log("Cannot find global pool!");
          return
        }
        console.log("global token", global.totalTokenStaked.toNumber());
        
        setGlobalPool(global);
      })();
      // calculate token balance
      (async () => {
        const balance = await getTokenBalance(wallet.publicKey, ELMNT_ADDRESS, connection);
        setTokenBalance(balance);
      })();

      // get userpool data
      (async () => {
        const user = await getUserInfo(wallet.publicKey, program);
        const provider = anchor.getProvider();
        setUserPool(user);
        console.log("user stake data", user?.totalTokenStaked.toNumber());

        if (!user) {
          initializeUserPool(wallet?.publicKey, program, provider);
        }
      })();

    }
  }, [connection, wallet]);

  return (
    <>
      <div className="w-100 mt-10 flex items-center justify-center font-semibold text-white">
        <div className="flex w-full flex-col gap-6 rounded-lg bg-[rgb(18,18,18)] p-3 sm:w-2/3 sm:p-6 lg:w-1/2">
          <h1 className="text-2xl">Yield Earning</h1>
          {/* TOtal Value */}
          <div>
            <p className="pb-1 text-xs">Total Value</p>
            <div className="flex flex-col gap-2 md:flex-row">
              <div className="flex w-full flex-col gap-1 rounded-md bg-[#1e1e1e] p-4 md:w-1/2">
                <p className="text-xs opacity-70">Total Value Locked</p>
                <p className="text-lg">${global ? global.totalTokenStaked.toNumber() / ELMNT_DECIMAL * 0.002039 : 0}</p>
              </div>
              <div className="flex w-full items-center gap-2 rounded-md bg-[#1e1e1e] p-2 md:w-1/2">
                <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border-2 border-gray-800">
                  <Image src={Falcon} alt="" width={20}></Image>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs opacity-70">Total FCON Staked</p>
                  <p className="text-lg">{global ? global.totalTokenStaked.toNumber() / ELMNT_DECIMAL : 0} FCON</p>
                </div>
              </div>
            </div>
          </div>
          {/* Your Yields */}
          <div>
            <p className="pb-1 text-xs">Your Yields</p>
            <div className="flex flex-col gap-2 rounded-md bg-[#1e1e1e] p-4">
              <div className="flex justify-between">
                <div className="flex w-1/2 items-center gap-2 rounded-md bg-[#1e1e1e] p-2">
                  <div className="hidden h-[50px] w-[50px] items-center justify-center rounded-full border-2 border-gray-800 sm:flex">
                    <Image src={Falcon} alt="" width={20}></Image>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs opacity-70">Total FCON Staked</p>
                    <p className="text-lg">{user ? user.totalTokenStaked.toNumber() / ELMNT_DECIMAL : 0} FCON</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center text-end">
                  <p className="text-xs opacity-70">Your FCON Balance</p>
                  <p className="text-lg">{tokenBalance} FCON</p>
                </div>
              </div>
              <div className="rounded-md bg-[#333334]">
                <div className="w-100 flex items-center justify-between border-b border-gray-600 p-4">
                  <div className="flex items-center gap-1.5 text-xs">
                    <Image src={Point} width={20} alt="" />
                    Project Yield
                  </div>
                  <div className="flex items-center gap-1">
                    <h1>$7.83</h1>
                    <div className="rounded-xl bg-[#623AFF] px-1.5 text-xs">
                      ATH
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs opacity-70">
                    You're earning
                  </p>
                  <h1 className="text-lg">{Math.floor(reward / ELMNT_DECIMAL)}</h1>
                </div>
              </div>
              {/* error alert */}
              {erroralert?<div className="bg-red-100 border  border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">error: </strong>
                <span className="block sm:inline">{errormsg}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={()=>setErroralert(false)}>
                  <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
              </div>:''}
              {wallet?.publicKey.toBase58() == ADMIN_WALLET ? <div className="flex flex-col gap-2">
                <div className="flex justify-between gap-2">
                  <div className="w-1/2 rounded-3xl h-10 border-1.5 border-gray-700 bg-[#333334] pl-4 pr-1 py-1 flex justify-between items-center">
                    <Image src={Falcon} width={15} alt=""></Image>
                    <input type="text" placeholder="0.00" value={popamount} onChange={(e) => setPopAmount(e?.target?.value)} className="text-[#868686] w-3/4 bg-[#333334] p-0 border-transparent focus:border-transparent focus:ring-0" />
                    <button className="w-8 h-8 bg-[#1e1e1e] rounded-full" onClick={() => setPopAmount((global?.totalTokenStaked.toNumber() / ELMNT_DECIMAL).toString())}>M</button>
                  </div>
                  <button className="w-1/2 flex items-center justify-center rounded-md bg-[#0EAFF4] hover:bg-[#5db7dd] p-2" onClick={() => popToken()}>
                    Pop
                  </button>
                </div>
                <div className="flex justify-between gap-2">
                  <div className="w-1/2 rounded-3xl h-10 border-1.5 border-gray-700 bg-[#333334] pl-4 pr-1 py-1 flex justify-between items-center">
                    <Image src={Falcon} width={15} alt=""></Image>
                    <input type="text" placeholder="0.00" value={deamount} onChange={(e) => setDeAmount(e?.target?.value)} className="text-[#868686] w-3/4 bg-[#333334] p-0 border-transparent focus:border-transparent focus:ring-0" />
                    <button className="w-8 h-8 bg-[#1e1e1e] rounded-full" onClick={() => setDeAmount(tokenBalance.toString())}>M</button>
                  </div>
                  <button className="w-1/2 flex items-center justify-center rounded-md bg-[#0EAFF4] hover:bg-[#5db7dd] p-2" onClick={() => depositeToken()}>
                    Deposite
                  </button>
                </div>
              </div> : ''
              }
              <div className="flex justify-between gap-2">
                <div className="w-1/2 rounded-3xl h-10 border-1.5 border-gray-700 bg-[#333334] pl-4 pr-1 py-1 flex justify-between items-center">
                  <Image src={Falcon} width={15} alt=""></Image>
                  <input type="text" placeholder="0.00" value={amount} onChange={(e) => setAmount(e?.target?.value)} className="text-[#868686] w-3/4 bg-[#333334] p-0 border-transparent focus:border-transparent focus:ring-0" />
                  <button className="w-8 h-8 bg-[#1e1e1e] rounded-full" onClick={() => setAmount(tokenBalance.toString())}>M</button>
                </div>
                <button className="w-1/2 flex items-center justify-center rounded-md bg-[#0EAFF4] hover:bg-[#5db7dd] p-2" onClick={() => stakeToken()}>
                  Stake
                </button>
              </div>
              <div className="w-full border-b-1 border-gray-700"></div>
              <div className="flex justify-between gap-2">
                <button className="flex w-1/2 items-center justify-center rounded-md bg-[#0EAFF4] hover:bg-[#5db7dd] p-2" onClick={() => claimReward()}>
                  Claim
                </button>
                <button className="flex w-1/2 items-center justify-center rounded-md bg-[#0EAFF4] hover:bg-[#5db7dd] p-2" onClick={() => unStake()}>
                  Unstake
                </button>

              </div>
            </div>
          </div>
          {/* APY */}
          <div className="relative ">
            <Image src={Band} alt=""></Image>
            <div className="absolute left-8 top-6">
              <p className="text-xs opacity-70">Stake FCON</p>
              <h1 className="text-3xl">7.85% APY</h1>
            </div>
          </div>
          {/* Loading */}
          {loading?<div className="fixed w-screen h-screen top-0 left-0 bg-[#1e1e1e]/[.1] backdrop-blur-sm flex justify-center items-center">
            <LoadingSpin/>
          </div>: ''}

        </div>
      </div>
    </>
  );
}
