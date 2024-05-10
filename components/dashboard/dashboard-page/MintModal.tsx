"use client";

import SpinnerIcon from "@/components/shared/icons/spinner";
import { inputReferralCode, mintNFT } from "@/lib/api/bsc";
import { toastError, toastSuccess } from "@/lib/toastify";
import { waitForTransaction } from "@wagmi/core";
import { useRequest } from "ahooks";
import { MINT_NFT_CHAIN_NAME } from "constants/global";
import Image from "next/image";
import { Fragment } from "react";
import { UseFormRegister, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setLastUpdateBSC } from "store/features/bsc/bscSlice";
import { setShowNDModalMint } from "store/features/newDashboard/newDashboardSlice";
import { setUpdatedAt } from "store/features/user/userSlice";
import { sleep } from "utils/promise";
import Button from "../../shared/button";
import Drawer from "../../shared/drawer";
import CupIcon from "../../shared/icons/cup-icon";
import RowInfo from "./RowInfo";

interface IMintInputProps {
  name: string;
  placeholder: string;
  prefixText?: string;
  typeInput?: string;
  value?: any;
  icon?: any;
  register: UseFormRegister<any>;
  readOnly?: boolean;
}

const MintInput = (props: IMintInputProps) => {
  const {
    name,
    placeholder,
    prefixText = "",
    value,
    typeInput = "number",
    icon,
    register,
    readOnly = false,
  } = props;
  return (
    <div className="relative mb-4 w-full">
      <div className="flex items-center gap-2">
        {readOnly ? (
          <input
            name={name}
            type={typeInput}
            className="w-full border-0 bg-transparent px-0 text-2xl font-medium outline-none [appearance:textfield] focus:outline-none
            focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder={placeholder}
            value={value}
            readOnly
          />
        ) : (
          <input
            type={typeInput}
            className="w-full border-0 bg-transparent px-0 text-2xl font-medium outline-none [appearance:textfield] focus:outline-none
            focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder={placeholder}
            min={1}
            max={50}
            {...register(name, {
              // required: true,
              validate: {
                positive: (v) => {
                  if (typeInput === "number") {
                    return v > 0;
                  }
                  return true;
                },
              },
            })}
          />
        )}

        <div className="flex items-center gap-2">
          <div className="text-[20px] font-bold">{prefixText}</div>
          {icon && <Image src={icon} alt="RP" className="h-6 w-6" />}
        </div>
      </div>
    </div>
  );
};

const MintModal = () => {
  const dispatch = useDispatch();
  const { showNDModalMint } = useSelector(
    (state: RootState) => state.newDashboard,
  );
  const { pricePerBNBValue, mintAmount, bnbToUSD, refCode } = useSelector(
    (state: RootState) => state.bsc,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    values: {
      refCode: refCode,
    },
  });

  const onSubmit = async (data: any) => {
    if (mintAmount === 0) {
      throw new Error("Mint amount is not valid!");
    }
    const txHash = await mintNFT({
      mint: mintAmount * pricePerBNBValue * 10 ** 18,
      amountNFT: mintAmount,
    });
    try {
      await waitForTransaction(txHash);
    } catch (error) {}

    await inputReferralCode({
      referral_code: data?.refCode ?? "",
      tx_hash:
        typeof txHash === "object"
          ? `${txHash?.hash ?? ""}`
          : `${txHash ?? ""}`,
      chain: MINT_NFT_CHAIN_NAME,
    });
    await dispatch(setUpdatedAt(Date.now()));
    return txHash;
  };

  const { run: submitForm, loading } = useRequest(onSubmit, {
    manual: true,
    onSuccess: async () => {
      await sleep(500);
      dispatch(setLastUpdateBSC());
      reset();

      await sleep(500);
      toastSuccess("Minted successfully!");
      dispatch(setShowNDModalMint(false));
    },
    onError(e: any) {
      toastError(e?.shortMessage ?? e?.message ?? "Error occur!");
    },
  });

  const closeModal = () => {
    dispatch(setShowNDModalMint(false));
  };

  return (
    <Fragment>
      <Drawer
        title="CONFIRM YOUR MINTING"
        isOpen={showNDModalMint}
        closeModal={closeModal}
        width={662}
        btnFooter={
          <Fragment>
            <Button
              className="h-[86px] w-full text-xl font-bold text-black shadow-topBtn"
              onClick={handleSubmit(submitForm)}
              loading={loading}
            >
              MINT NOW
            </Button>
          </Fragment>
        }
      >
        <form autoComplete="mint-now" className="relative flex h-full flex-col">
          <div className="flex-1">
            <div className="absolute bottom-0 left-0 right-0 top-0 z-20 hidden bg-black/50 backdrop-blur-3xl">
              <SpinnerIcon className="w-20" />
            </div>
            <div className="flex justify-center">
              <div className="relative flex h-[350px] w-[450px] items-center">
                <Image src="/images/chip-aviatrix.png" alt="RP" fill />
              </div>
            </div>
            <div className="px-9 py-6">
              <RowInfo
                title1="MINTING QUALTITY"
                value1={
                  <div className="mt-[4px] flex w-[135px] items-center justify-between gap-2">
                    {/* <div
                    className="h-[32px] cursor-pointer select-none text-2xl font-medium"
                    onClick={() => {
                      if (parseInt(mintQuality) <= 0) {
                        setMintQuality("0");
                        return;
                      }
                      setMintQuality(`${parseInt(mintQuality) - 1}`);
                    }}
                  >
                    -
                  </div> */}
                    <div>
                      {/* <input
                      className="border-0 outline-none text-2xl font-medium bg-transparent focus:outline-none focus:ring-0 w-[40px]
                      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      value={mintQuality}
                      type="number"
                      onChange={(e) => setMintQuality(e.target.value)}
                    /> */}
                      <div className="text-center text-2xl font-medium">
                        {mintAmount}
                      </div>
                    </div>
                    {/* <div
                    className="h-[32px] cursor-pointer select-none text-2xl font-medium"
                    onClick={() => {
                      if (parseInt(mintQuality) >= 100) {
                        setMintQuality("100");
                        return;
                      }
                      setMintQuality(`${parseInt(mintQuality) + 1}`);
                    }}
                  >
                    +
                  </div> */}
                  </div>
                }
                title2={
                  <div className="flex items-center justify-end gap-1">
                    <div className="text-[#ebff00]">
                      <CupIcon
                        style={{
                          filter: "drop-shadow(0px 0px 6px #ebff0072)",
                        }}
                      />
                    </div>
                    <div className="opacity-80">
                      AVIATRIX CHAMPIONSHIP ATTEMPTS
                    </div>
                  </div>
                }
                value2={mintAmount * 3}
              />
            </div>
            <div className="h-[1px] bg-[#ffffff26]">&nbsp;</div>
            <div className="px-9 py-6">
              <RowInfo
                title1="BNB TOTAL PRICE"
                value1={(mintAmount * pricePerBNBValue).toFixed(3)}
                title2="USD TOTAL PRICE"
                value2={(mintAmount * pricePerBNBValue * bnbToUSD).toFixed(3)}
              />
            </div>
            <div className="h-[1px] bg-[#ffffff26]">&nbsp;</div>
            <div className="px-9 py-6">
              <div className="uppercase opacity-80">ENTER REFERRAL CODE</div>
              <div className="mt-[4px] text-2xl">
                <MintInput
                  name="refCode"
                  placeholder="0x192djkfkr81kxl9182"
                  icon={null}
                  register={register}
                  typeInput="text"
                  // value={session?.user?.referrals?.invited_by ? session?.user?.referrals?.invited_by : null}
                  // readOnly={!!session?.user?.referrals?.invited_by}
                />
              </div>
            </div>
            <div className="h-[1px] bg-[#ffffff26]">&nbsp;</div>
          </div>
        </form>
      </Drawer>
    </Fragment>
  );
};

export default MintModal;
