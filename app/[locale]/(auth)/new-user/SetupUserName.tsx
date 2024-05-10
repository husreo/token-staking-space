import Button from "@/components/shared/button";
import TextInput from "@/components/shared/input/TextInput";
import { verifyCaptcha } from '@/lib/api/recaptcha';
import { useRequest } from "ahooks";
import { AVATARS } from "constants/socials";
import { Session } from "next-auth";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import Translation from "utils/translation";
import NeedConfirmation from "./NeedConfirmation";
// import SelectAvatar from "./SelectAvatar";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''

const SetupUsername = ({
  session,
  locale,
  // updateSession,
  referralCode = "",
}: {
  session?: Session;
  locale?: string;
  referralCode?: string;
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsverified] = useState<boolean>(false);
  const [recaptchaErrorMsg, setRecaptchaErrorMsg] = useState<string | null>(null);

  const t = useTranslations();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    values: {
      userName: "",
      nickName: "",
      email: session?.user.email || "",
      referralCode: referralCode || undefined,
      password: "",
      image: AVATARS[0],
    },
  });

  const onSubmit = async (data: any) => {
    if (!isVerified) {
      recaptchaRef.current?.reset();
      setRecaptchaErrorMsg("new-user.failed-captcha");
      throw "Failed Captcha";
    }
    setRecaptchaErrorMsg(null)
    const response = await fetch(`/api/user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        provider: session?.provider,
        providerId: session?.providerAccountId,
        image: selectedAvatar,
      }),
    });
    if (!response.ok) {
      const d = await response.json();
      throw d;
    }
    recaptchaRef.current?.reset();
    return;
  };

  async function handleCaptchaSubmission(token: string | null) {
    setRecaptchaErrorMsg(null);
    await verifyCaptcha(`${token ?? ''}`)
      .then(() => {
        setIsverified(true);
      })
      .catch(() => {
        setIsverified(false);
      })
  }

  const { run: submitForm, loading } = useRequest(onSubmit, {
    manual: true,
    onSuccess: async () => {
      // updateSession();
      push("/welcome?status=new-user");
    },
    onError(e: any) {
      const inputString = e.message as string;

      const keywords = ["username", "email", "nickname"];
      const keywordRegex = new RegExp(keywords.join("|"), "i");

      const matches = inputString.match(keywordRegex);
      const foundKeyword = matches ? matches[0] : null;

      recaptchaRef.current?.reset();
      setRecaptchaErrorMsg(null);
      setError(`root`, {
        message: `errors.exists.${foundKeyword}`,
      });
    },
  });

  if (session?.user?.is_verified && !!session?.user?.nickname)
    return (
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-black dark:text-white">
          You&apos;ve already verfied, return to homepage
        </h1>
        <Link href="/">
          <Button className="rounded-lg p-2">Back to Home</Button>
        </Link>
      </div>
    );
  else if (!session?.user.is_verified && !!session?.user?.nickname) {
    return <NeedConfirmation />;
  }
  // if (!!session)
  return (
    <form
      autoComplete="new-password"
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col justify-center gap-9 sm:px-5 md:px-0"
    >
      <h2 className="text-center text-3xl text-black sm:text-left">
        {t("new-user.create-spacefalcon-id")}
      </h2>
      {/* <div className="flex items-center gap-5">
          <Image
            src={selectedAvatar}
            width={128}
            height={128}
            className="rounded-full"
            alt="avatar"
            loading="eager"
          />
          <SelectAvatar
            selectedAvatar={selectedAvatar}
            setSelectedAvatar={(e) => {
              setSelectedAvatar(e);
              setValue("image", e);
            }}
          />
        </div> */}
      <div className="flex flex-col gap-5">
        {/* <div className="col-span-6">
                <TextInput
                  maxLength={81}
                  label="Nickname"
                  {...register("nickName", {
                    required: true,
                    validate: {
                      shouldNotEmpty: (v) => !/^\s*$/.test(v),
                    },
                  })}
                  name="nickName"
                />
                {errors?.nickName && (
                  <p className="mt-1 text-[13px] font-medium text-error">
                    <Translation text={`errors.${errors.nickName.type}`} />
                  </p>
                )}
              </div> */}
        <div className="w-full">
          <TextInput
            label="Email"
            inputClassname="h-14"
            labelStyle="font-aeonikPro text-[11px] font-normal"
            type="email"
            disabled={!!session?.user.email}
            {...register("email", {
              required: true,
              validate: {
                invalidEmail: (v) =>
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
              },
            })}
            name="email"
          />
          {errors?.email && (
            <p className="mt-1 text-[13px] font-medium text-error">
              <Translation text={`errors.${errors.email.type}`} />
            </p>
          )}
        </div>
        <div className="w-full">
          <TextInput
            label="Space Falcon ID | Username"
            inputClassname={`h-14 text-black`}
            labelStyle="font-aeonikPro text-[11px] font-normal"
            maxLength={20}
            {...register("userName", {
              required: true,
              validate: {
                shouldNotContainSpaceUsername: (v) => !/.*\s+.*/.test(v),
                specialChar: (v) => !/[^a-zA-Z0-9\s]/.test(v.trimEnd()),
                shouldNotContainUppercase: (v) => !/[A-Z]/.test(v.trimEnd()),
                atLeastFiveCharacters: (v) => v.length >= 5,
                invalidLength: (v) => !(v.length > 20),
              },
            })}
            name="userName"
          />
          {errors?.userName ? (
            <p className="mt-1 text-[13px] font-medium text-error">
              <Translation text={`errors.${errors.userName.type}`} />
            </p>
          ) : null}
        </div>

        <div className="w-full">
          <TextInput
            type="password"
            inputClassname="h-14 flex items-center justify-between font-aeonikPro"
            placeholder={t("sign-in.password")}
            {...register("password", {
              required: true,
              minLength: 8,
              // maxLength: 20,
              validate: {
                invalidPassword: (e) =>
                  /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-\s]+$/g.test(
                    e.toString(),
                  ), //Allow input of everything, including spaces, except for emojis.
                shouldNotContainSpaceUsername: (e) => !/.*\s+.*/.test(e),
                // containSpecialCharacter: (e) =>
                //   /.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-].*/.test(e),
                // mustContainUppercase: (v) => /[A-Z]/.test(v),
                // atLeastOneNumber: (v) => /.*\d.*/.test(v),
                // lowercaseLetter: (e) => /[a-z]/.test(e),
                atLeastFiveCharacters: (e) => e.length >= 8,
                // invalidPassword: (e) => !/[\uD800-\uDFFF]./g.test(e),
              },
            })}
            name="password"
          />

          {errors?.password &&
            errors.password.type !== "minLength" &&
            errors.password.type !== "maxLength" && (
              <p className="mt-1 text-[13px] font-medium text-error">
                <Translation text={`errors.${errors.password.type}`} />
              </p>
            )}
          {errors?.password?.type === "minLength" && (
            <p className="mt-1 text-[13px] font-medium text-error">
              {t("error-messages.minCharacters", {
                count: 8,
              })}
            </p>
          )}
          {errors?.password?.type === "maxLength" && (
            <p className="mt-1 text-[13px] font-medium text-error">
              {t("error-messages.maxCharacters", {
                count: 20,
              })}
            </p>
          )}
        </div>
        <div className="w-full">
          <TextInput
            inputClassname="h-14 flex items-center font-aeonikPro"
            placeholder={t("new-user.referral-code")}
            {...register("referralCode", {
              validate: {
                uppercaseNumber: (e) =>
                  !!e ? (/^[A-Za-z0-9]+$/.test(e) ? true : false) : true,
                sixCharacterMinAndMax: (e) => {
                  return !!e ? (e.length === 6 ? true : false) : true;
                },
              },
            })}
            name="referralCode"
          />

          {errors.referralCode?.type === "sixCharacterMinAndMax" && (
            <p className="text-xs font-medium text-red-500">
              Refer code must have exact 6 characters
            </p>
          )}
          {errors.referralCode?.type === "uppercaseNumber" && (
            <p className="text-xs font-medium text-red-500">
              Only uppercase letters and number are allowed
            </p>
          )}
        </div>
        <div>
          <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            ref={recaptchaRef}
            onChange={handleCaptchaSubmission}
            hl={locale === 'vn' ? 'vi': 'en'}
          />
        </div>
        {recaptchaErrorMsg && (
          <div className="mt-1 text-[13px] font-medium text-error"><Translation text={`${recaptchaErrorMsg}`} /></div>
        )}
      </div>

      <div className="text-center">
        {errors?.root && (
          <p className="text-[13px] text-error">
            <Translation text={`${errors.root.message}`} />
          </p>
        )}
        <p className="mb-2 font-aeonikPro text-xs font-normal text-[#06826B]">
          <Translation text="new-user.signup-information" />
        </p>
        <Button
          type="submit"
          variant="default"
          className="mx-auto mt-5 w-52 rounded-[1000px] border border-black/10 !py-3 dark:border-white/10"
          // onClick={() => swiper.slideNext()}
          loading={loading}
        >
          <div className="flex items-center justify-center gap-1 font-aeonikPro font-medium text-gray0">
            {/* {loading && <SpinnerIcon className="h-4 w-4" />} */}
            <Translation text="button.next" />
          </div>
        </Button>
      </div>
    </form>
  );

  // return null;
};

export default SetupUsername;
