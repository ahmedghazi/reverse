import gsap from "gsap";
import type { TextAnimation, Timing } from "./types";

const STEP = 100 / 3; // one layer, as a % of the 3-layer column
const DURATION = 0.12; // seconds per layer
const STAGGER = 0.002; // delay between letters
const SKEW = 12; // deg, peaks mid-roll

const columns = (root: HTMLElement) =>
  root.querySelectorAll<HTMLElement>(".char-stack");

// roll every column to `layer` (−1 = hidden below, 0 = 1st, 1 = 2nd, 2 = 3rd,
// 3 = hidden above),
// rolling straight through each layer in between with a skew
function roll(
  root: HTMLElement,
  layer: number,
  { duration = DURATION, stagger = STAGGER }: Timing = {},
) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tl = gsap.timeline();
  let dir = 0; // 1 = chars rolling up, -1 = down

  columns(root).forEach((el, i) => {
    if (reduce) {
      tl.set(el, { yPercent: -layer * STEP }, 0);
      return;
    }
    const from =
      Math.round(
        (-(gsap.getProperty(el, "yPercent") as number) / STEP) * 1000,
      ) / 1000;
    if (from === layer) return;
    dir = layer > from ? 1 : -1;
    // one continuous tween through every layer in between, no pause per layer
    const t = gsap.timeline();
    t.to(el, {
      yPercent: -layer * STEP,
      duration: duration * Math.abs(layer - from),
      ease: "power2.inOut",
    });
    tl.add(t, i * stagger);
  });

  // whole block skews 0 → SKEW → 0 in one motion spanning the char roll,
  // leaning with the roll direction
  const total = tl.duration() * 0.7;
  (root.parentNode as HTMLElement).style.setProperty(
    "--total-duration",
    total.toString() + "s",
  );
  (root.parentNode as HTMLElement).style.setProperty("--dir", dir.toString());
  // if (!reduce && total > 0) {
  //   tl.fromTo(
  //     root,
  //     { skewY: 0 },
  //     {
  //       skewY: dir * (SKEW / 2),
  //       duration: total,
  //       ease: (p: number) => Math.sin(Math.PI * p), // 0 → 1 → 0
  //       // ease: "power2.inOut",
  //     },
  //     0,
  //   );
  // }
  return tl;
}

// each letter is a masked column of 3 identical layers; hover rolls 1st → 2nd → 3rd
const stackRoll: TextAnimation = {
  layers: 3,
  hide: (root, timing) => roll(root, -1, timing).progress(1),
  // scrolling down: rise from below through all 3 layers, then snap back to
  // the 1st (identical to the 3rd) so hover can roll again
  // scrolling up: drop from above through 3rd → 2nd → 1st
  enter: (root, timing, dir = "down") => {
    if (dir === "up") {
      gsap.set(columns(root), { yPercent: -3 * STEP }); // hidden above
      return roll(root, 0, timing);
    }
    gsap.set(columns(root), { yPercent: STEP }); // hidden below
    return roll(root, 2, timing).set(columns(root), { yPercent: 0 });
  },
  hover: (root, timing) => roll(root, 2, timing),
  leave: (root, timing) => roll(root, 0, timing),
};

export default stackRoll;
