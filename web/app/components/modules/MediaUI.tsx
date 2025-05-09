import React from "react";
import clsx from "clsx";
import { MediaUI } from "@/app/types/schema";
import Figure from "../ui/Figure";
import { VideoWrapper } from "../ui/player";
import Slider from "../ui/slick-slider/index.jsx";
import "./MediaUI.scss";

interface Props {
  input: MediaUI;
}

const ModuleMediaUI = ({ input }: Props) => {
  const items = input.item || [];

  type MediaItem = (typeof items)[number];

  const renderMedia = (media: MediaItem) => {
    switch (media?._type) {
      case "image":
        return <Figure asset={media.asset} width={2000} />;
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
      <section className='module module--mediaUI '>
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
