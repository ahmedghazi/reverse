import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

// only discrete values live in state so consumers don't re-render every scroll frame
export function useScroll({ belowThreshold = 50 } = {}) {
  const [isBelowViewPort, setIsBelowViewPort] = useState<boolean>(false);
  const [scrollDirection, setScrollDirection] = useState<string>("");
  const [isBottom, setIsBottom] = useState<boolean>(false);
  const bottomThreshold: number = 100;
  const lastScrollTopRef = useRef<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;
    // read live values (scroll-snap fires few events, stale state = wrong final value)
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (y !== lastScrollTopRef.current) {
        setScrollDirection(y > lastScrollTopRef.current ? "down" : "up");
      }
      setIsBelowViewPort(y > belowThreshold);
      const distanceToBottom =
        document.documentElement.scrollHeight - (window.innerHeight + y);
      setIsBottom(distanceToBottom <= bottomThreshold);
      lastScrollTopRef.current = y;
    };
    const listener = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", listener, { passive: true });
    // final position once snapping has settled
    window.addEventListener("scrollend", update);
    return () => {
      window.removeEventListener("scroll", listener);
      window.removeEventListener("scrollend", update);
      cancelAnimationFrame(frame);
    };
  }, [belowThreshold]);

  useEffect(() => {
    setTimeout(() => {
      setIsBottom(false);
      setScrollDirection("down");
      setIsBelowViewPort(window.scrollY > belowThreshold);
      lastScrollTopRef.current = window.scrollY;
    }, 500);
  }, [pathname]);

  return {
    scrollDirection,
    isBottom,
    isBelowViewPort,
  };
}
