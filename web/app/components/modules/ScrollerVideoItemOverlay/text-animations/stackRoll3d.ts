import gsap from "gsap";
import type { TextAnimation, Timing } from "./types";

const DURATION = 0.2; // seconds per quarter turn
const STAGGER = 0.04; // delay between letters

const drums = (root: HTMLElement) =>
  root.querySelectorAll<HTMLElement>(".char-flip");

// smallest angle ≥ `from` that lands on `face` (0 = front, 180 = back)
const next = (from: number, face: number) =>
  from + ((((face - from) % 360) + 360) % 360);

// turn every drum to the angle `to(from)` picks, letters staggered left → right
// like the footer logo
function spin(
  root: HTMLElement,
  to: (from: number) => number,
  { duration = DURATION, stagger = STAGGER }: Timing = {},
) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tl = gsap.timeline();

  drums(root).forEach((el, i) => {
    // pivot sits mid-depth, half a glyph behind the front face
    gsap.set(el, { transformOrigin: `50% 50% ${-el.offsetHeight / 2}px` });
    const from = gsap.getProperty(el, "rotateX") as number;
    const target = to(from);
    if (reduce) {
      tl.set(el, { rotateX: target }, 0);
      return;
    }
    if (from === target) return;
    tl.to(
      el,
      {
        rotateX: target,
        duration: (duration * Math.abs(target - from)) / 90,
        ease: "power2.inOut",
      },
      i * stagger,
    );
  });
  return tl;
}

// each letter is a 3D drum: the word on the front, the word turned 180° on the
// back; hover spins forward to the back face, leave carries on to the front
const stackRoll3d: TextAnimation = {
  layers: 1,
  flip: true,
  hide: (root) => gsap.timeline().set(drums(root), { rotateX: 90 }), // edge-on
  // scrolling down: roll up from below, past the back face, onto the front
  // scrolling up: same, rolling down from above
  enter: (root, timing, dir = "down") => {
    gsap.set(drums(root), { rotateX: dir === "up" ? 270 : -270 });
    return spin(root, () => 0, timing);
  },
  hover: (root, timing) => spin(root, (from) => next(from, 180), timing),
  leave: (root, timing) =>
    spin(root, (from) => next(from, 0), timing).set(drums(root), {
      rotateX: 0, // 360 → 0, keeps angles small
    }),
};

export default stackRoll3d;
