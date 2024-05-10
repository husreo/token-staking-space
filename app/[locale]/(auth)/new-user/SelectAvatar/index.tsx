import ModalWrapper from "@/components/shared/ModalWrapper";
import Button from "@/components/shared/button";
import { RadioGroup } from "@headlessui/react";
import { AVATARS } from "constants/socials";
import Image from "next/image";
import React, { useState } from "react";
import { classNames } from "utils/string";

type Props = {
  selectedAvatar: string;
  setSelectedAvatar: (e: string) => void;
};

const SelectAvatar: React.FC<Props> = ({
  selectedAvatar,
  setSelectedAvatar,
}) => {
  const [open, setOpen] = useState(false);
  const [tmpSelected, setTmpSelected] = useState(selectedAvatar);

  const toggleOpen = () => setOpen((prev) => !prev);
  const handleSelectAvatar = () => {
    setSelectedAvatar(tmpSelected);
    toggleOpen();
  };

  const handleCancelSelectAvatar = () => {
    setTmpSelected(selectedAvatar);
    toggleOpen();
  };

  return (
    <>
      <Button
        onClick={toggleOpen}
        type="button"
        className="rounded-[42px] px-6 py-3"
        variant="secondary"
      >
        Choose Avatar
      </Button>
      <ModalWrapper open={open} onClose={toggleOpen}>
        <div className="w-screen max-w-[742px] rounded-[20px] bg-gray2">
          <div className="relative mx-auto my-14 h-[176px] w-[176px] overflow-hidden rounded-full border-[2px] border-fcon p-3">
            <Image
              src={tmpSelected}
              alt="avatar"
              className="rounded-full"
              width={150}
              height={150}
              loading="eager"
            />
          </div>
          <div className="rounded-[20px] bg-gray3 p-14">
            <RadioGroup
              value={tmpSelected}
              onChange={setTmpSelected}
              className="flex flex-wrap justify-evenly gap-x-10 gap-y-5"
            >
              {AVATARS.map((avatar, idx) => (
                <RadioGroup.Option
                  className="cursor-pointer"
                  key={`select-avatar-${idx}`}
                  value={avatar}
                >
                  {({ checked }) => (
                    <Image
                      width={88}
                      height={88}
                      src={avatar}
                      alt=""
                      className={classNames(
                        "rounded-full",
                        checked ? "border-[2px] border-fcon" : "",
                      )}
                    />
                  )}
                </RadioGroup.Option>
              ))}
            </RadioGroup>
            <div className="dark mt-9 flex justify-center gap-4">
              <Button
                onClick={handleCancelSelectAvatar}
                variant="muted"
                className="w-[171px] rounded-[42px] px-5 py-3"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSelectAvatar}
                className="w-[171px] rounded-[42px] px-5 py-3"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </ModalWrapper>
    </>
  );
};

export default SelectAvatar;
