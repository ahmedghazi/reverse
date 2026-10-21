import React, { useEffect, useState } from "react";
// import clsx from "clsx";
import { MediaUI } from "@/app/types/schema";
import Figure from "../ui/Figure";
import { VideoWrapper } from "../ui/player";
import Slider from "../ui/slick-slider/index.jsx";
import useDeviceDetect from "@/app/hooks/useDeviceDetect";
import "./MediaUI.scss";

interface Props {
  input: MediaUI;
}

const ModuleMediaUI = ({ input }: Props) => {
  const items = input.item || [];
  const [index, setIndex] = useState(0);

  type MediaItem = (typeof items)[number];
  const { isMobile } = useDeviceDetect();

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
    console.log(_index, index);
    switch (media?._type) {
      case "figure":
        return (
          <Figure
            asset={isMobile ? media.imageMobile?.asset : media.image?.asset}
            width={isMobile ? 1000 : 2000}
            alt={media.image?.alt || ""}
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
