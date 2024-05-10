import React, { useState, useEffect } from "react";
import { classNames } from "utils/string";

const TextEffect = ({
  text,
  speed = 50,
  increment = 8,
  theLettersAnimation = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  className = "",
}: {
  text: string | any;
  speed?: number;
  increment?: number;
  theLettersAnimation?: string;
  className?: string;
}) => {
  const [output, setOutput] = useState("");
  const clen = text.length;
  let intervalRef: any = null;

  const runEffect = () => {
    let stri = 0;
    let block = "";
    let fixed = "";
    let si = 0;

    const rustle = (i: number) => {
      intervalRef = setTimeout(() => {
        if (--i) rustle(i);
        nextFrame(i);
        si = si + 1;
      }, speed);
    };

    const nextFrame = (pos: number) => {
      for (let i = 0; i < clen - stri; i++) {
        let num = Math.floor(theLettersAnimation.length * Math.random());
        let letter = theLettersAnimation.charAt(num);
        block = block + letter;
      }
      if (si === increment - 1) {
        stri++;
      }
      if (si === increment) {
        fixed = fixed + text.charAt(stri - 1);
        si = 0;
      }
      setOutput(fixed + block);
      block = "";
    };

    rustle(clen * increment + 1);
  };

  const stopEffect = () => {
    clearTimeout(intervalRef);
    setOutput(text);
  };

  useEffect(() => {
    runEffect();
    return () => clearTimeout(intervalRef);
  }, []);

  return (
    <div
      className={classNames(className)}
      id="output"
      onMouseEnter={runEffect}
      onMouseLeave={stopEffect}
    >
      {output}
    </div>
  );
};

export default TextEffect;
