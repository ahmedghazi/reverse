"use client";

import { useEffect, useRef, useState } from "react";
import ReverseText from "./ReverseText";
import {
  isTextAnimation,
  textAnimations,
  type TextAnimationName,
} from "./text-animations";
import type { ScrollDirection, Timing } from "./text-animations/types";

type Props = {
  title: string;
  subtitle?: string;
  inView: boolean;
  animation?: TextAnimationName;
  duration?: number; // seconds per step, defaults to the style's own
  stagger?: number; // seconds between letters, defaults to the style's own
  delay?: number; // seconds before the in-view animation starts
};

export default function OverlayContent({
  title,
  subtitle,
  inView,
  animation = "stackRoll",
  duration = 0.5,
  stagger = 0.05,
  delay = 0.5, // after the clip-path wipe
}: Props) {
  const text = useRef<HTMLDivElement>(null);
  const anim = useRef<gsap.core.Timeline | null>(null);

  // ?textAnim=stackRoll overrides the prop, for testing styles
  const [name, setName] = useState(animation);
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("textAnim");
    setName(isTextAnimation(param) ? param : animation);
  }, [animation]);
  const style = textAnimations[name];

  const timing: Timing = { duration, stagger };

  // last scroll direction, so the in-view animation can follow it
  const scrollDir = useRef<ScrollDirection>("down");
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y !== last) scrollDir.current = y > last ? "down" : "up";
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const stop = () => {
    anim.current?.kill();
    text.current?.classList.remove("is-animating");
  };

  const run = (
    play: (root: HTMLElement, timing?: Timing) => gsap.core.Timeline,
    wait = 0,
  ) => {
    const el = text.current;
    if (!el) return;
    stop();
    anim.current = play(el, timing)
      .delay(wait)
      .eventCallback("onStart", () => el.classList.add("is-animating"))
      .eventCallback("onComplete", () => el.classList.remove("is-animating"));
  };

  // in view: letters animate in from blank
  useEffect(() => {
    if (!text.current) return;
    if (!inView) {
      stop();
      style.hide(text.current); // clear while off-screen
      return;
    }
    run((root, t) => style.enter(root, t, scrollDir.current), delay);
  }, [inView, style]);

  // hover in / out
  useEffect(() => {
    const el = text.current;
    if (!el) return;
    const enter = () => run(style.hover);
    const leave = () => run(style.leave);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      stop();
    };
  }, [style, duration, stagger]);

  return (
    <div className='overlay-content'>
      <div className='overlay-text' ref={text} data-text-anim={name}>
        <ReverseText
          as='h2'
          className='text-lg'
          layers={style.layers}
          flip={style.flip}>
          {title}
        </ReverseText>
        {subtitle && (
          <ReverseText as='p' layers={style.layers} flip={style.flip}>
            {subtitle}
          </ReverseText>
        )}
      </div>
    </div>
  );
}
