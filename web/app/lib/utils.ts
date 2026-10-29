//https://codepen.io/sosuke/pen/Pjoqqp?editors=1010
export function getCssFilterByHex(hex: string) {
  switch (hex.toLowerCase()) {
    case "#fcec96":
      return "invert(86%) sepia(47%) saturate(354%) hue-rotate(348deg) brightness(103%) contrast(98%)";
    case "#fbbb81":
      return "invert(89%) sepia(54%) saturate(7391%) hue-rotate(301deg) brightness(98%) contrast(101%)";
    case "#acecff":
      return "invert(87%) sepia(23%) saturate(991%) hue-rotate(169deg) brightness(104%) contrast(101%)";
    default:
      return "";
  }
}

// runs `cb` once the page has loaded and the main thread is idle: keeps heavy,
// non critical work (lottie, video streams) out of the LCP / TBT window.
// returns a cleanup that cancels it
export function onPageIdle(cb: () => void, timeout = 2000): () => void {
  let idle: number | undefined;
  const _schedule = () => {
    idle = window.requestIdleCallback
      ? window.requestIdleCallback(cb, { timeout })
      : window.setTimeout(cb, 200);
  };
  if (document.readyState === "complete") _schedule();
  else window.addEventListener("load", _schedule, { once: true });

  return () => {
    window.removeEventListener("load", _schedule);
    if (idle === undefined) return;
    if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
    else window.clearTimeout(idle);
  };
}
