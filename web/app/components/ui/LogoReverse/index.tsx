"use client";
import React, { useEffect, useState } from "react";
// import type { AnimationItem } from "lottie-web";
import LottiePlayer from "../LottiePlayerAlt";
import { useScroll } from "../../../hooks/useScroll";
import animationData from "./Reverse_Black_opti.json";
import { usePreloadLottie } from "./usePreloadLottie";

interface LogoReverseProps {
  baseline?: string;
}

const LogoReverse: React.FC<LogoReverseProps> = ({ baseline }) => {
  const [direction, setDirection] = useState<number>(1);
  const { scrollDirection, isBottom } = useScroll();
  // const isPreloaded = usePreloadLottie(animationData);
  // const [isClient, setIsClient] = useState<boolean>(false);

  // Gestion du chargement côté client
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // Gestion de la direction du défilement
  useEffect(() => {
    if (scrollDirection === "down" || isBottom) {
      setDirection(-1);
    } else if (scrollDirection === "up") {
      setDirection(1);
    }

    // if (isBottom) {
    //   setDirection(-1); // Simplifié 1 * -1 à -1
    // }
  }, [scrollDirection, isBottom]);

  // Afficher un placeholder pendant le chargement
  // if (!isClient || !isPreloaded) {
  //   return (
  //     <div
  //       className='logo logo-reverse'
  //       style={{
  //         width: "100%",
  //         height: "100%",
  //         backgroundColor: "transparent",
  //       }}
  //     />
  //   );
  // }

  return (
    <div className='logo logo-reverse'>
      <LottiePlayer file={animationData} direction={direction} />
      {baseline && <div className='baseline md:text-md'>{baseline}</div>}
    </div>
  );
};

export default React.memo(LogoReverse);
