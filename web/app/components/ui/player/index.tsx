import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// import PubSub, { publish, subscribe, unsubscribe } from "pubsub-js";
import ReactPlayer from "react-player";
import type { ReactPlayerProps } from "react-player/types";
// import TimelineControls from "./TimelineControls";
import { useInView } from "react-intersection-observer";
import website from "@/app/config/website";
import clsx from "clsx";
// import screenfull from "screenfull"
import TimelineControls from "./TimelineControls";
import "./index.scss";
import Figure from "../Figure";
import { SanityImageAsset } from "sanity-codegen";
import { SanityReference } from "@/app/types/schema";
// import { subscribe } from "pubsub-js";

type InputProps = {
  url: string;
  autoplay?: boolean;
  thumbnail?: SanityImageAsset | SanityReference<SanityImageAsset> | any;
  aspectRatio?: string;
};

type VideoStateProps = {
  playing: boolean;
  muted: boolean;
  volume: number;
  fullscreen: boolean;
  progress: number | any;
  duration: number | any;
  ready: boolean;
};

const initialVideoState = {
  playing: false,
  muted: false,
  volume: 0,
  fullscreen: false,
  progress: 0 || null,
  duration: 0 || null,
  ready: false,
};

type VideoContextProps = {
  video: VideoStateProps;
  setVideo: Function;
};

// stable reference: a new object each render makes react-player re-apply config
const config = {
  youtube: {
    // iv_load_policy: 3,
    // cc_load_policy: 0,
    // rel: 0,
    origin: website.url,

    iv_load_policy: 3,
    cc_load_policy: 0,
    // modestbranding: 1,
    // showinfo: 0,
    rel: 0,
  },
  vimeo: {
    title: false,
  },
} satisfies ReactPlayerProps["config"];

// youtube id from watch / youtu.be / embed / shorts urls
const _getYoutubeId = (url: string): string | null => {
  const match = url.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/,
  );
  return match ? match[1] : null;
};

// delay before an autoplay embed is mounted without any user interaction
const AUTOPLAY_FALLBACK_DELAY = 4000;

const VideoContext = createContext<VideoContextProps>({} as VideoContextProps);

const VideoWrapper: React.FC<InputProps> = ({
  url,
  autoplay = false,
  thumbnail,
  aspectRatio = "16 / 9",
}) => {
  const [ready, setReady] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);
  // facade: the embed (~1MB of third party js) is only mounted on click, or for
  // autoplay after the first interaction / once the page has loaded
  const [activated, setActivated] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const youtubeId = useMemo(() => (url ? _getYoutubeId(url) : null), [url]);
  // youtube-video-element embeds from youtube-nocookie.com when the src contains "-nocookie"
  const src = youtubeId
    ? `https://www.youtube-nocookie.com/embed/${youtubeId}`
    : url;
  const [video, setVideo] = useState<VideoStateProps>(() => ({
    ...initialVideoState,
    playing: autoplay,
    volume: autoplay ? 0 : 1,
    muted: autoplay,
  }));
  // const [seek, setSeek] = useState<number>(0);
  const playerRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  // only mount the (heavy) player iframe when close to the viewport
  const { ref: nearRef, inView: isNear } = useInView({
    triggerOnce: true,
    rootMargin: "200px",
  });

  // console.log(autoplay, video);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!autoplay || activated) return;
    let timer: number | undefined;
    const events = ["scroll", "pointerdown", "pointermove", "touchstart", "keydown"];
    const _activate = () => setActivated(true);
    const _onLoad = () => {
      timer = window.setTimeout(_activate, AUTOPLAY_FALLBACK_DELAY);
    };
    events.forEach((e) =>
      window.addEventListener(e, _activate, { once: true, passive: true }),
    );
    if (document.readyState === "complete") _onLoad();
    else window.addEventListener("load", _onLoad, { once: true });

    return () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, _activate));
      window.removeEventListener("load", _onLoad);
    };
  }, [autoplay, activated]);

  const _onFacadeClick = () => {
    setClicked(true);
    setActivated(true);
    setVideo((video) => ({ ...video, playing: true }));
  };

  // useEffect(() => {
  //   if (playerRef.current) playerRef.current.currentTime = seek;
  // }, [seek]);

  useEffect(() => {
    // console.log(inView, autoplay);
    if (autoplay && window.innerWidth > 1080) {
      if (inView) {
        setVideo((video) => ({
          ...video,
          playing: autoplay,
          muted: video.muted,
        }));
      } else {
        setVideo((video) => ({
          ...video,
          playing: false,
          muted: video.muted,
        }));
      }
    }
  }, [inView]);

  // console.log(video)

  const _onStart = () => {
    setStarted(true);
  };

  // const _onDuration = (event: React.SyntheticEvent<HTMLVideoElement>) => {
  //   const { duration } = event.currentTarget;
  //   // console.log(duration)
  //   setVideo((video) => ({
  //     ...video,
  //     duration: duration,
  //   }));
  // };
  const _onReady = () => {
    // console.log(event)

    setVideo((video) => ({
      ...video,
      progress: null,
      duration: null,
      ready: true,
    }));
    // setReady(true);
  };
  // const _onStart = (event) => {};
  // const _onError = (event) => {};
  // const _onEnded = () => {
  //   // publish("VIDEO_ENDED");
  // };

  // const _togglePlayPause = () => {
  //   setVideo({
  //     ...video,
  //     playing: !video.playing,
  //   });
  // };

  // const _toggleMuted = () => {
  //   setVideo({
  //     ...video,
  //     muted: !video.muted,
  //   });
  // };

  // console.log(showControls);
  const contextValue = useMemo(() => ({ video, setVideo }), [video]);

  return (
    <VideoContext.Provider value={contextValue}>
      <div
        className={clsx(
          "video-wrapper bg-black h-full ",
          autoplay && "is-autoplay",
          video.playing ? "is-playing" : "is-pause",
        )}
        ref={(node) => {
          ref(node);
          nearRef(node);
        }}>
        {url && !(ready && isNear && activated) && (
          <button
            type='button'
            className='video-facade'
            style={{ aspectRatio }}
            onClick={_onFacadeClick}
            aria-label='Lire la vidéo'>
            {youtubeId && (
              <img
                src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
                alt=''
                loading='lazy'
                decoding='async'
              />
            )}
            {!autoplay && (
              <span className='video-facade__play' aria-hidden='true'>
                <svg
                  width='42'
                  height='48'
                  viewBox='0 0 42 48'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M41 22.268C42.3333 23.0378 42.3333 24.9623 41 25.7321L3.5 47.3827C2.16667 48.1525 0.499998 47.1902 0.499998 45.6506L0.5 2.34936C0.5 0.809758 2.16667 -0.152488 3.5 0.617312L41 22.268Z'
                    fill='white'
                  />
                </svg>
              </span>
            )}
          </button>
        )}
        {url && ready && isNear && activated && (
          <div
            // onClick={_togglePlayPause}
            className='cursor-pointer pointer-events-auto '>
            <ReactPlayer
              ref={playerRef}
              className={clsx(
                "react-player",
                // autoplay ? "pointer-events-none" : ""
              )}
              src={src}
              width='100%'
              height='100%'
              // react-player only calls play() on re-render, which happens before the
              // embed is loaded: autoPlay makes the element start itself once ready
              autoPlay={autoplay || clicked}
              playing={video.playing}
              controls={!autoplay}
              // loop={false}
              playsInline
              config={config}
              muted={autoplay}
              // volume={video.volume}
              // onPlay={_onStart}
              // onDurationChange={_onDuration}
              onReady={_onReady}
              // onEnded={_onEnded}
              style={{
                aspectRatio: aspectRatio,
              }}
            />
          </div>
        )}

        {/* {!video.playing && (
          <div className='inset-0 absolute'>
            <Figure asset={thumbnail} width={600} />
          </div>
        )} */}

        {/* <div className='controls flex'>
          <button
            className='cartouche cartouche--gray btn-play'
            onClick={_togglePlayPause}
            title='play'>
            <svg
              width='15'
              height='19'
              viewBox='0 0 15 19'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M15 9.5L0.75 18.5933L0.75 0.406734L15 9.5Z'
                fill='black'
              />
            </svg>
          </button>
          <button
            className='cartouche cartouche--gray btn-pause'
            onClick={_togglePlayPause}
            title='pause'>
            <svg
              width='13'
              height='16'
              viewBox='0 0 13 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <rect width='4' height='16' fill='black' />
              <rect x='9' width='4' height='16' fill='black' />
            </svg>
          </button>
          <TimelineControls setSeek={setSeek} />
        </div> */}

        {/* {autoplay && video.playing && (
          <button
            className={clsx(
              "toggle-muted cartouche",
              video.muted ? "is-active" : ""
            )}
            onClick={_toggleMuted}>
            {video.muted ? "SOUND OFF" : "SOUND ON"}
          </button>
        )} */}
      </div>
    </VideoContext.Provider>
  );
};

export { VideoContext, VideoWrapper };
