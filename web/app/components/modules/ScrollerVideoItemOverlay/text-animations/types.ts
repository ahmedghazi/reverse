export type Timing = {
  duration?: number; // seconds per step (half-flip / layer)
  stagger?: number; // seconds between letters
};

export type ScrollDirection = "up" | "down";

type Play = (root: HTMLElement, timing?: Timing) => gsap.core.Timeline;

export type TextAnimation = {
  layers: number; // glyph copies ReverseText renders per char
  flip?: boolean; // ReverseText renders a front/back face per char instead
  hide: Play;
  enter: (
    root: HTMLElement,
    timing?: Timing,
    dir?: ScrollDirection, // scroll direction that brought it into view
  ) => gsap.core.Timeline;
  hover: Play;
  leave: Play;
};
