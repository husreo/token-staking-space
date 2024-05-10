import Link from "next/link";

const Item = ({ title, value }: { title: string; value: any }) => (
  <div className="border flex flex-col justify-between border-white/[0.15] bg-white/[0.1] p-6 max-sm:col-span-full">
    <div className="mb-[30px] uppercase">{title}</div>
    <div className="text-4xl font-bold leading-[48px]">{value}</div>
  </div>
);

export default function ChampionshipTerminal() {
  return (
    <div className="relative flex h-full flex-col justify-between border-b border-l border-r border-white/[0.15]">
      <div className="px-9 pb-6 pt-9 text-xl">CHAMPIONSHIP TERMINAL</div>
      <div className="flex min-h-[319px] flex-col justify-end bg-champion-terminal p-9">
        <div className="mb-3 flex flex-wrap items-center justify-between text-3xl font-semibold">
          <div>YOUR CHAMPIONSHIP DATA</div>
          <div>
            <Link className="text-white underline" href="/#download-to-play">
              PLAY NOW
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Item title="RANK" value="98" />
          <Item title="CURRENT SCORE" value="0" />
          <Item title="ESTIMATED REWARDS" value="SOON" />
        </div>
      </div>
    </div>
  );
}