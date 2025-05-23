import React from "react";
// import clsx from "clsx";
import { MediaUI } from "@/app/types/schema";
import Figure from "../ui/Figure";
import { VideoWrapper } from "../ui/player";
import Slider from "../ui/slick-slider/index.jsx";
import "./MediaUI.scss";
import useDeviceDetect from "@/app/hooks/useDeviceDetect";

interface Props {
  input: MediaUI;
}

const ModuleMediaUI = ({ input }: Props) => {
  const items = input.item || [];

  type MediaItem = (typeof items)[number];
  const { isMobile } = useDeviceDetect();

  const renderMedia = (media: MediaItem) => {
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
          <VideoWrapper url={media.url as string} autoplay />
        ) : null;
      default:
        return null;
    }
  };

  if (items.length > 1) {
    // Slider for multiple items
    return (
      <section className='module module--mediaUI snap'>
        <Slider settingsOverride={{ autoplay: true }}>
          {items.map((media, i: number) => (
            <div className='media-item' key={i}>
              {renderMedia(media)}
            </div>
          ))}
        </Slider>
      </section>
    );
  }

  // Single item (image or embed)
  const media = items[0];
  return (
    <section className='module module--mediaUI snap'>
      {media ? renderMedia(media) : null}
    </section>
  );
};

export default ModuleMediaUI;
