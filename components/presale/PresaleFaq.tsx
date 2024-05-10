import Translation from "utils/translation";

const FAQ_LIST = [
  {
    id: 1,
    question: "What is Aviatrix Starter Pack Pre-sale?",
    answer:
      "It’s an early sale with limited supply and lower price for early investors before the public sale.",
  },
  {
    id: 2,
    question: "Where can I find the Pre-sale?",
    answer: "Pre-sale is open in our website and Discord server.",
  },
  {
    id: 3,
    question: "When can I claim my NFT?",
    answer:
      "Aviatrix Starter Packs will be distributed after both, Pre-sale and public sale are over. (Date TBA)",
  },
  {
    id: 4,
    question: "What can I do with Aviatrix Starter Pack?",
    answer:
      "Holders get full access to farming, staking + yield boost, Aviatrix Tournament and occasional SOL, USDC and FCON airdrops.",
  },
];

const FaqItem = ({
  question,
  answer,
}: {
  question: string | JSX.Element;
  answer: string | JSX.Element;
}) => (
  <div className="w-auto gap-4 rounded-[18px] bg-white/[0.08] p-12 lg:w-[931px]">
    <div className="text-[24px] font-medium">{question}</div>
    <div className="text-[20px] opacity-70">{answer}</div>
  </div>
);

const PresaleFaq = () => {
  return (
    <div className="container relative mx-auto px-3 font-aeonikPro text-white md:px-0">
      <div className="mb-10 text-center text-[50px] font-medium leading-[60px]">
        FAQ
      </div>
      <div className="mb-[270px] flex flex-col items-center gap-4">
        {FAQ_LIST.map((i, idx) => (
          <FaqItem
            key={i?.id}
            question={
              <Translation text={"presale.faq.question-" + (idx + 1)} />
            }
            answer={<Translation text={"presale.faq.answer-" + (idx + 1)} />}
          />
        ))}
      </div>
    </div>
  );
};

export default PresaleFaq;
