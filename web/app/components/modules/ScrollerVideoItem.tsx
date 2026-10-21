import { ScrollerVideoItem } from "@/app/types/schema";
import MuxPlayerComponent from "../ui/mux-player";
import { _linkResolver } from "@/app/sanity-api/utils";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";

type ScrollerVideoItemProps = {
  input: ScrollerVideoItem;
};

const ScrollerVideoItemComponent = ({ input }: ScrollerVideoItemProps) => {
  const [canPlay, setCanPlay] = useState(false);
  const { ref, inView } = useInView({
    // > 0.5 so only one full-screen item counts as in view at a time
    threshold: 0.5,
  });

  useEffect(() => {
    setCanPlay(inView);
  }, [inView]);

  return (
    <div
      ref={ref}
      className={clsx("scroller-video-item", { "can-play": canPlay })}>
      <MuxPlayerComponent
        playbackId={input.video.asset.playbackId}
        canPlay={canPlay}
      />
      <div className='overlay'>
        <div className='overlay-content'>
          <h2 className='text-lg'>{input.title}</h2>
          {input.subTitle && <p>{input.subTitle}</p>}
        </div>
        {input.article && (
          <a
            className='btn btn-primary cta'
            href={_linkResolver(input.article)}>
            En savoir plus
          </a>
        )}
      </div>
    </div>
  );
};

export default ScrollerVideoItemComponent;
