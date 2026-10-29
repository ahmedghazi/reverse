"use client";
import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
// import { usePreloadLottie } from "./usePreloadLottie";

// lottie-web + animations are heavy (frame-by-frame webp), keep them out of the main bundle
// keep the box while the chunk loads, otherwise the header collapses and jumps
const LottiePlayer = dynamic(() => import("./LottiePlayer"), {
  ssr: false,
  loading: () => <div className='lottie-player' />,
});

const LOTTIE_BLACK = "/lottie/reverse-lottie-black.json";
const LOTTIE_YELLOW = "/lottie/reverse-lottie-yellow.json";
const LOTTIE_WHITE = "/lottie/reverse-lottie-white.json";
const LOTTIE_SOURCES = {
  black: LOTTIE_BLACK,
  yellow: LOTTIE_YELLOW,
  white: LOTTIE_WHITE,
};
// static frame rendered server side: it is the LCP element, the lottie replaces it once loaded
const POSTER_SOURCES = {
  black: "/lottie/poster-black.svg",
  yellow: "/lottie/poster-yellow.svg",
  white: "/lottie/poster-white.svg",
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
  // keeps the current animation on screen until the next colour has loaded
  const [loaded, setLoaded] = useState<{ src: string; data: any } | null>(null);
  const animationData = loaded?.data;
  // poster stays on top of the lottie until it has rendered, then fades out (no gap)
  const [lottieReady, setLottieReady] = useState<boolean>(false);
  const _onLottieReady = useCallback(() => setLottieReady(true), []);
  // footer logo: only load when close to the viewport
  const isYellow = color === "yellow";
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "400px",
    skip: !isYellow,
  });
  const shouldLoad = !isYellow || inView;
  // footer logo: plays each time it scrolls into view
  const { ref: visibleRef, inView: isVisible } = useInView({
    threshold: 0.5,
    skip: !isYellow,
  });

  // a new colour mounts a new animation: show the poster again until it is painted
  useEffect(() => {
    setLottieReady(false);
  }, [loaded?.src]);

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

  return (
    <div
      className='logo logo-reverse'
      ref={(node) => {
        ref(node);
        visibleRef(node);
      }}>
      <div className='logo-reverse__media'>
        {animationData ? (
          <LottiePlayer
            key={loaded?.src}
            file={animationData}
            visible={isYellow ? isVisible : undefined}
            onReady={_onLottieReady}
          />
        ) : (
          <div className='lottie-player' />
        )}
        <img
          className={clsx("lottie-poster", lottieReady && "is-hidden")}
          src={POSTER_SOURCES[color]}
          alt='Reverse'
          width={1080}
          height={608}
          fetchPriority={isYellow ? "auto" : "high"}
          loading={isYellow ? "lazy" : "eager"}
          decoding={isYellow ? "async" : "sync"}
          aria-hidden={lottieReady}
        />
      </div>
      {baseline && <div className='baseline md:text-md'>{baseline}</div>}
    </div>
  );
};

export default React.memo(LogoReverse);
