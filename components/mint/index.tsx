import ComponentContainer from "../shared/container/ComponentContainer";
import CountdownMint from "./CountdownMint";
import WhiteListProgress from "./WhiteListProgress";
const MintView = () => {
  return (
    <>
      {/* <Image
        src={WhitelistBG}
        className="absolute left-0 right-0 top-0 h-[900px] w-screen object-cover lg:h-screen lg:min-h-[960px] xl:min-h-[960px]"
        alt="bg"
        priority
      /> */}
      <ComponentContainer className="relative z-20 flex max-w-[1284px] flex-col justify-end gap-24 px-3 pb-10 pt-28 lg:h-[920px] lg:px-5 xl:px-0">
        <CountdownMint />
        <WhiteListProgress />
        {/* <MintPack />
        <MintStats /> */}
      </ComponentContainer>
      {/* {(shouldShow && (
        <div
          style={{
            background: "linear-gradient(180deg, #171717 0%, #000 100%)",
          }}
          className="pt-52 [clip-path:polygon(0_16%,_100%_0%,_100%_100%,_0%_100%)]"
        >
          <ComponentContainer>
            <AviatrixStarterPack />
          </ComponentContainer>
        </div>
      )) ||
        null} */}
    </>
  );
};

export default MintView;
