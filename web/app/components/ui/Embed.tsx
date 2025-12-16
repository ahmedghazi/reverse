import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Embed as EmbedType } from "@/app/types/schema";
import { publish } from "pubsub-js";
import ReactPlayer from "react-player";

type Props = {
  input: EmbedType;
};

const Embed = ({ input }: Props) => {
  const [play, setPlay] = useState<boolean>(false);

  const _play = () => {
    setPlay(!play);
  };

  useEffect(() => {
    publish("VIDEO_PLAY_PAUSE", {
      url: input?.url,
      play: play,
    });
  }, [play]);

  return (
    <div className='embed'>
      {input.url && (
        <div
          style={
            {
              // aspectRatio: "16 / 9",
            }
          }
          className={clsx("player-container  ")}>
          <ReactPlayer
            url={input.url}
            // controls={true}
            width='100%'
            height='100%'
            style={{
              // width: "100%",
              // height: "100%",
              aspectRatio: "16 / 9",
            }}
          />
        </div>
      )}
      {input.iframe && (
        <div dangerouslySetInnerHTML={{ __html: input.iframe }} />
      )}
    </div>
  );
};

export default Embed;
