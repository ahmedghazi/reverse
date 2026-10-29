import { useEffect, useRef } from "react";
import { type MuxPlayerRefAttributes } from "@mux/mux-player-react";
// lazy: player + hls.js are only loaded when the item nears the viewport
import MuxPlayer from "@mux/mux-player-react/lazy";
import "./index.scss";

type MuxPlayerComponentProps = {
  playbackId: string;
  canPlay?: boolean;
};

const MuxPlayerComponent = ({
  playbackId,
  canPlay = false,
}: MuxPlayerComponentProps) => {
  const playerRef = useRef<MuxPlayerRefAttributes>(null);

  // autoPlay is only read on load, so drive play/pause imperatively
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    if (canPlay) {
      player.play()?.catch(() => {});
    } else {
      player.pause();
    }
  }, [canPlay]);

  return (
    <div className='mux-player'>
      <MuxPlayer
        ref={playerRef}
        playbackId={playbackId}
        muted={true}
        playsInline={true}
        loop={true}
        // covers the case where the lazy player mounts while already in view
        autoPlay={canPlay ? "muted" : false}
        // hls: never fetch a rendition larger than the player
        capRenditionToPlayerSize
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default MuxPlayerComponent;
