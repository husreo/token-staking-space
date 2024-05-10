import confetti from "canvas-confetti";
import { useEffect } from "react";
const end = Date.now() + 15 * 1000;
const SuccessPresale = () => {
  const frame = () => {
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 100,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });
  };
  useEffect(() => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
  }, []);

  return <div>Successfully Enrolled</div>;
};

export default SuccessPresale;
