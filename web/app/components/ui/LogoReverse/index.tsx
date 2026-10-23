"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useScroll } from "../../../hooks/useScroll";
// import { usePreloadLottie } from "./usePreloadLottie";

// lottie-web + animations are heavy (frame-by-frame webp), keep them out of the main bundle
const LottiePlayer = dynamic(() => import("./LottiePlayer"), { ssr: false });

const LOTTIE_BLACK = "/lottie/reverse-lottie-black.json";
const LOTTIE_YELLOW = "/lottie/reverse-lottie-yellow.json";
const LOTTIE_WHITE = "/lottie/reverse-lottie-white.json";

interface LogoReverseProps {
  baseline?: string;
  // isYellow?: boolean;
  color?: "black" | "yellow" | "white";
}

const LogoReverse: React.FC<LogoReverseProps> = ({
  baseline,
  // isYellow = false,
  color = "black",
}) => {
  const [direction, setDirection] = useState<number>(1);
  const [animationData, setAnimationData] = useState<any>(null);
  const { scrollDirection, isBottom } = useScroll();
  // footer logo: only load when close to the viewport
  const isYellow = color === "yellow";
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "400px",
    skip: !isYellow,
  });
  const shouldLoad = !isYellow || inView;
  let LOTTIE_SOURCE = LOTTIE_BLACK;
  if (color === "yellow") {
    LOTTIE_SOURCE = LOTTIE_YELLOW;
  }
  if (color === "white") {
    LOTTIE_SOURCE = LOTTIE_WHITE;
  }

  useEffect(() => {
    if (!shouldLoad || animationData) return;
    const controller = new AbortController();
    console.log(LOTTIE_SOURCE);
    fetch(LOTTIE_SOURCE, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(() => {});
    return () => controller.abort();
  }, [shouldLoad, animationData, color]);

  // Gestion de la direction du défilement
  useEffect(() => {
    if (!isYellow) return;
    if (isBottom) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    // if (scrollDirection === "down" || isBottom) {
    //   setDirection(1);
    // } else if (scrollDirection === "up") {
    //   setDirection(-1);
    // }
  }, [scrollDirection, isBottom]);

  return (
    <div className='logo logo-reverse' ref={ref}>
      {animationData ? (
        <LottiePlayer file={animationData} direction={direction} />
      ) : (
        <div className='lottie-player' />
      )}
      {baseline && <div className='baseline md:text-md'>{baseline}</div>}
    </div>
  );
};

export default React.memo(LogoReverse);
