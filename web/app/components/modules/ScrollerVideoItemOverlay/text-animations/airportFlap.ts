import gsap from "gsap";
import type { TextAnimation, Timing } from "./types";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = UPPER.toLowerCase();
const FLIP = 0.05; // seconds per half-flip
const STAGGER = 0.035; // delay between letters

const randomGlyph = (c: string) => {
  const set = c === c.toUpperCase() ? UPPER : LOWER;
  return set[Math.floor(Math.random() * set.length)];
};

// natural width of a glyph inside this slot
const measure = (el: HTMLElement, ch: string) => {
  const prevChar = el.dataset.char ?? "";
  const prevWidth = el.style.width;
  el.style.width = "auto";
  el.dataset.char = ch;
  const w = el.getBoundingClientRect().width;
  el.dataset.char = prevChar;
  el.style.width = prevWidth;
  return w;
};

function flap(
  root: HTMLElement,
  getTarget: (original: string) => string,
  { duration = FLIP, stagger = STAGGER }: Timing = {},
) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tl = gsap.timeline();

  root.querySelectorAll<HTMLElement>("[data-reverse]").forEach((word) => {
    const original = word.getAttribute("aria-label") ?? "";
    const target = getTarget(original);

    word.querySelectorAll<HTMLElement>(".char").forEach((el, i) => {
      const final = target[i] ?? " ";
      // blank state keeps the original letter's width so the word doesn't collapse
      const width = measure(
        el,
        final === " " && original[i] !== " " ? original[i] : final,
      );
      const at = i * stagger;

      if (reduce || final === " ") {
        tl.set(el, { width, attr: { "data-char": final } }, at);
        return;
      }

      const steps = gsap.utils.random(2, 6, 1);
      const t = gsap.timeline();
      for (let s = 0; s <= steps; s++) {
        const ch = s === steps ? final : randomGlyph(final);
        t.to(el, { rotateX: -90, duration, ease: "power1.in" })
          .set(el, { attr: { "data-char": ch } })
          .fromTo(
            el,
            { rotateX: 90 },
            { rotateX: 0, duration, ease: "power1.out" },
          );
      }
      // slot eases to its final width over the whole flap
      t.to(el, { width, duration: t.duration(), ease: "power2.inOut" }, 0);

      tl.add(t, at);
    });
  });
  return tl;
}

const same = (s: string) => s;
const reverse = (s: string) => Array.from(s).reverse().join("");
const blank = (s: string) => s.replace(/./g, " ");

// letters flap through random glyphs like a split-flap board, reversing on hover
const airportFlap: TextAnimation = {
  layers: 1,
  hide: (root, timing) => flap(root, blank, timing).progress(1),
  enter: (root, timing) => flap(root, same, timing),
  hover: (root, timing) => flap(root, reverse, timing),
  leave: (root, timing) => flap(root, same, timing),
};

export default airportFlap;
