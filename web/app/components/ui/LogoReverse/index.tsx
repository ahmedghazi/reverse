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
const LOTTIE_SOURCES = {
  black: LOTTIE_BLACK,
  yellow: LOTTIE_YELLOW,
  white: LOTTIE_WHITE,
};

// fetched animations, shared across instances and colour switches
const lottieCache = new Map<string, any>();

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
  // keeps the current animation on screen until the next colour has loaded
  const [loaded, setLoaded] = useState<{ src: string; data: any } | null>(
    null,
  );
  const animationData = loaded?.data;
  const { scrollDirection, isBottom } = useScroll();
  // footer logo: only load when close to the viewport
  const isYellow = color === "yellow";
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "400px",
    skip: !isYellow,
  });
  const shouldLoad = !isYellow || inView;

  // (re)load whenever the colour changes, not just the first time
  useEffect(() => {
    const src = LOTTIE_SOURCES[color];
    if (!shouldLoad || loaded?.src === src) return;

    const cached = lottieCache.get(src);
    if (cached) {
      setLoaded({ src, data: cached });
      return;
    }

    const controller = new AbortController();
    fetch(src, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        lottieCache.set(src, data);
        setLoaded({ src, data });
      })
      .catch(() => {});
    return () => controller.abort();
  }, [shouldLoad, loaded, color]);

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
