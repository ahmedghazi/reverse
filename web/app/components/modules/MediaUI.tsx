import React, { useEffect, useState } from "react";
// import clsx from "clsx";
import { MediaUI } from "@/app/types/schema";
import Figure from "../ui/Figure";
import { VideoWrapper } from "../ui/player";
import Slider from "../ui/slick-slider/index.jsx";
import "./MediaUI.scss";

interface Props {
  input: MediaUI;
  // first module of the page: its first slide is the LCP
  priority?: boolean;
}

const ModuleMediaUI = ({ input, priority = false }: Props) => {
  // console.log(input);
  const items = input.item || [];
  const [index, setIndex] = useState(0);

  type MediaItem = (typeof items)[number];

  useEffect(() => {
    // console.log(index);
    const token = PubSub.subscribe("SLIDER_CHANGE", (e, d) => {
      setIndex(d);
    });

    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  const renderMedia = (media: MediaItem, _index: number) => {
    // console.log(_index, index);
    switch (media?._type) {
      case "figure":
        return (
          <Figure
            asset={media.image?.asset}
            assetMobile={media.imageMobile?.asset}
            width={2000}
            widthMobile={1000}
            alt={media.image?.alt || ""}
            priority={priority && _index === 0}
          />
        );
      case "embed":
        return media.url ? (
          <VideoWrapper url={media.url as string} autoplay={_index === index} />
        ) : media.iframe ? (
          <div dangerouslySetInnerHTML={{ __html: media.iframe }} />
        ) : null;

      default:
        return null;
    }
  };

  if (items.length > 1) {
    return (
      <section className='module module--mediaUI snap'>
        <Slider settingsOverride={{ autoplay: false }}>
          {items.map((media, i: number) => (
            <div className='media-item' key={i}>
              {renderMedia(media, i)}
            </div>
          ))}
        </Slider>
      </section>
    );
  }

  const media = items[0];
  return (
    <section className='module module--mediaUI snap'>
      {media ? renderMedia(media, 0) : null}
    </section>
  );
};

export default ModuleMediaUI;
