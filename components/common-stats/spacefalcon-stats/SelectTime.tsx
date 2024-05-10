import { RadioGroup } from "@headlessui/react";
import { classNames } from "utils/string";

const SelectTime = ({
  plan,
  setPlan,
}: {
  plan: number;
  setPlan: (n: number) => void;
}) => {
  // let [plan, setPlan] = useState(1);
  return (
    <RadioGroup
      className="flex cursor-pointer justify-center border-t border-white/10 font-aeonikMono"
      value={plan}
      onChange={setPlan}
    >
      <RadioGroup.Option className="h-[30px] flex-1" value={1}>
        {({ checked }) => (
          <div
            className={classNames(
              checked ? "bg-white/10 text-white" : " text-white/50",
              "flex h-full w-full items-center justify-center text-[11px]",
            )}
          >
            1 day
          </div>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option className="flex-1" value={7}>
        {({ checked }) => (
          <div
            className={classNames(
              checked ? "bg-white/10 text-white" : " text-white/50",
              "flex h-full w-full items-center justify-center text-[11px]",
            )}
          >
            1 week
          </div>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option className="flex-1" value={30}>
        {({ checked }) => (
          <div
            className={classNames(
              checked ? "bg-white/10 text-white" : " text-white/50",
              "flex h-full w-full items-center justify-center text-[11px]",
            )}
          >
            1 month
          </div>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option className="flex-1" value={365}>
        {({ checked }) => (
          <div
            className={classNames(
              checked ? "bg-white/10 text-white" : " text-white/50",
              "flex h-full w-full items-center justify-center text-[11px]",
            )}
          >
            1 year
          </div>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  );
};

export default SelectTime;
