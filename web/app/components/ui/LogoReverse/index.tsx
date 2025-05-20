"use client";
import React, { useEffect, useState } from "react";
import LottiePlayer from "./LottiePlayer";
import { useScroll } from "../../../hooks/useScroll";
import animationDataBlack from "./reverse-lottie-black.json";
import animationDataYellow from "./reverse-lottie-yellow.json";
// import { usePreloadLottie } from "./usePreloadLottie";

interface LogoReverseProps {
  baseline?: string;
  isYellow?: boolean;
}

const LogoReverse: React.FC<LogoReverseProps> = ({
  baseline,
  isYellow = false,
}) => {
  const [direction, setDirection] = useState<number>(1);
  const { scrollDirection, isBottom } = useScroll();

  // Gestion de la direction du défilement
  useEffect(() => {
    if (scrollDirection === "down" || isBottom) {
      setDirection(1);
    } else if (scrollDirection === "up") {
      setDirection(-1);
    }
  }, [scrollDirection, isBottom]);

  return (
    <div className='logo logo-reverse'>
      <LottiePlayer
        file={isYellow ? animationDataYellow : animationDataBlack}
        direction={direction}
      />
      {baseline && <div className='baseline md:text-md'>{baseline}</div>}
    </div>
  );
};

export default React.memo(LogoReverse);
