import { RadioGroup } from "@headlessui/react";
import { classNames } from "utils/string";

function SelectInventory({
  setNFTStorage,
  value,
}: {
  setNFTStorage: (n: string) => void;
  value: string;
}) {
  // let [plan, setPlan] = useState("inventory");
  return (
    <RadioGroup
      className="flex h-12 rounded-md bg-gray2 p-1 font-medium text-white max-[414px]:h-16"
      value={value}
      onChange={setNFTStorage}
    >
      <RadioGroup.Option className="w-[100px]" value="inventory">
        {({ checked }) => (
          <p
            className={classNames(
              checked
                ? "rounded border-white/[0.12] bg-gray3"
                : "border-transparent",
              "flex h-full w-full cursor-pointer items-center justify-center rounded-md border transition-all duration-100 ease-linear",
            )}
          >
            Inventory
          </p>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option className="flex-1" value="wallet">
        {({ checked }) => (
          <p
            className={classNames(
              checked
                ? "rounded border-white/[0.12] bg-gray3"
                : "border-transparent",
              "flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-md border pl-1 transition-all duration-100 ease-linear",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="593"
              height="493"
              fill="none"
              viewBox="0 0 593 493"
              className="w-5"
            >
              <path
                fill="#AB9FF2"
                d="M70.055 493c75.549 0 132.325-65.703 166.208-117.622-4.121 11.487-6.411 22.973-6.411 34 0 30.325 17.4 51.919 51.74 51.919 47.161 0 97.527-41.351 123.626-85.919-1.832 6.433-2.747 12.406-2.747 17.919 0 21.135 11.904 34.46 36.172 34.46 76.465 0 153.387-135.541 153.387-254.081C592.03 81.324 545.327 0 428.112 0 222.069 0 0 251.784 0 414.432 0 478.297 34.34 493 70.055 493zM357.14 163.568c0-22.973 12.821-39.054 31.593-39.054 18.315 0 31.136 16.081 31.136 39.054 0 22.973-12.821 39.513-31.136 39.513-18.772 0-31.593-16.54-31.593-39.513zm97.985 0c0-22.973 12.821-39.054 31.593-39.054 18.315 0 31.136 16.081 31.136 39.054 0 22.973-12.821 39.513-31.136 39.513-18.772 0-31.593-16.54-31.593-39.513z"
              ></path>
            </svg>
            Phantom Wallet
          </p>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  );
}

export default SelectInventory;
