"use client";
import React, { useEffect, useState } from "react";
import LottiePlayer from "./LottiePlayer";
import { useScroll } from "../../../hooks/useScroll";
import animationData from "./Reverse_Black_opti.json";
// import { usePreloadLottie } from "./usePreloadLottie";

interface LogoReverseProps {
  baseline?: string;
}

const LogoReverse: React.FC<LogoReverseProps> = ({ baseline }) => {
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
      <LottiePlayer file={animationData} direction={direction} />
      {baseline && <div className='baseline md:text-md'>{baseline}</div>}
    </div>
  );
};

export default React.memo(LogoReverse);
