"use client";
import React, { FC, useCallback, useEffect, useRef } from "react";
import Lottie from "react-lottie-player";
import clsx from "clsx";
import { subscribe, unsubscribe } from "pubsub-js";

// stable references: react-lottie-player destroys and recreates the animation
// whenever rendererSettings changes (a new object each render = blank flash)
const RENDERER_SETTINGS = { preserveAspectRatio: "xMidYMid slice" };
// canvas, not svg: a canvas is never an LCP candidate, whereas the svg <image> frames
// are reported far larger than they are and replace the poster as a late LCP.
// The canvas renderer also waits for the embedded images before DOMLoaded
const RENDERER = "canvas";
const STYLE = { width: "100%", height: "100%" };

type Props = {
  file: string | any;
  // undefined: plays on DOC_READY (header), boolean: plays each time it becomes visible (footer)
  visible?: boolean;
  onReady?: () => void;
};

const LottiePlayerAlt: FC<Props> = ({ file, visible, onReady }) => {
  const lottieRef = useRef<any>(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;
  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  useEffect(() => {
    if (visible !== undefined) return;
    const token = subscribe("DOC_READY", () => {
      lottieRef.current?.goToAndPlay(0, true);
    });

    return () => {
      unsubscribe(token);
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    lottieRef.current?.goToAndPlay(0, true);
  }, [visible]);

  // the svg renderer fires DOMLoaded before the embedded webp frames are loaded:
  // wait for them, then a couple of frames so the first one is painted
  const _onLoad = useCallback(() => {
    const anim = lottieRef.current;
    const _done = () =>
      requestAnimationFrame(() =>
        requestAnimationFrame(() => onReadyRef.current?.()),
      );
    if (!anim || anim.imagePreloader?.loadedImages()) {
      _done();
    } else {
      anim.addEventListener("loaded_images", _done);
    }
    // header: DOC_READY may already have fired (the lottie is loaded after the page)
    const docReady = !document.body.classList.contains("is-loading");
    if (visibleRef.current || (visibleRef.current === undefined && docReady)) {
      anim?.goToAndPlay(0, true);
    }
  }, []);

  return (
    <div className={clsx("lottie-player")}>
      <Lottie
        ref={lottieRef}
        animationData={file}
        loop={false}
        play={false}
        speed={1.5}
        renderer={RENDERER}
        rendererSettings={RENDERER_SETTINGS}
        style={STYLE}
        onLoad={_onLoad}
      />
    </div>
  );
};

export default LottiePlayerAlt;
