import { ScrollerVideoItem } from "@/app/types/schema";
import { _linkResolver } from "@/app/sanity-api/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import OverlayContent from "./ScrollerVideoItemOverlay/OverlayContent";
// import OverlayContent from "./ScrollerVideoItemOverlay/OverlayContent";

type ScrollerVideoItemProps = {
  input: ScrollerVideoItem;
  initialInView?: boolean;
};

const THRESHOLD = 0.4;

const ScrollerVideoItemComponent = ({
  input,
  initialInView = false,
}: ScrollerVideoItemProps) => {
  const [isInView, setIsInView] = useState(initialInView);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState<boolean>(false);
  const { ref, inView } = useInView({
    // > 0.5 so only one full-screen item counts as in view at a time
    threshold: THRESHOLD,
    initialInView,
  });

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      nodeRef.current = node;
      ref(node);
    },
    [ref],
  );

  useEffect(() => {
    setIsInView(inView);
  }, [inView]);

  // detect on page load (incl. restored scroll position) without waiting for the observer
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const { top, bottom, height } = node.getBoundingClientRect();
    const visible = Math.min(bottom, window.innerHeight) - Math.max(top, 0);
    if (height > 0 && visible / height >= THRESHOLD) setIsInView(true);
  }, []);

  return (
    <div
      ref={setRefs}
      className={clsx("scroller-video-item snap bg-red", {
        "can-play": isInView,
        reveal: isInView,
      })}>
      {/* {input.video && input.video.asset && (
        <MuxPlayerComponent
          playbackId={input.video?.asset?.playbackId}
          canPlay={isInView}
        />
      )} */}
      <div className='overlay'>
        {input.title && (
          <OverlayContent
            title={input.title}
            subtitle={input.subTitle || ""}
            inView={isInView}
            animation='stackRoll'
            // animation='stackRoll3d'
          />
        )}
        {/* {input.article && (
          <a
            className='btn btn-primary cta'
            href={_linkResolver(input.article)}>
            En savoir plus
          </a>
        )} */}
      </div>
    </div>
  );
};

export default ScrollerVideoItemComponent;
