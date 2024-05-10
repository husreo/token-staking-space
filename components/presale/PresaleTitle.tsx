import Translation from "utils/translation";

const PresaleTitle = () => {
  return (
    <div className="container mx-auto px-3 w-full max-w-sm text-center font-aeonikPro text-white backdrop-blur-sm md:max-w-lg lg:max-w-[520px] lg:text-left lg:backdrop-blur-0">
      <p className="mb-5 text-4xl md:leading-[60px] md:text-[50px]">
        <Translation text="presale.title" />
      </p>
      <p className="text-lg leading-6">
        <Translation text="presale.main-description" />
      </p>
    </div>
  );
};

export default PresaleTitle;
