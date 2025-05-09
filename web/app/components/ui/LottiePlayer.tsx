"use client";
import React, { FC, useEffect, useState, useRef } from "react";
import Lottie, { EventListener } from "react-lottie";

import { subscribe, unsubscribe, publish } from "pubsub-js";
import clsx from "clsx";

type Props = {
  file: string | any;
  direction: number;
};

const LottiePlayer: FC<Props> = ({ file, direction }) => {
  const [animation, setAnimation] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [autoplay, setAutoplay] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const animationRef = useRef<Lottie>(null);

  // const width = widdth;
  // const height = width * 0.3;

  useEffect(() => {
    const controller: AbortController = new AbortController();
    // _fetchAnimation(controller);

    // const tokenRoute = subscribe("ROUTE_UPDATE", () => {
    //   _fetchRandomAnimation(controller);
    // });

    // const tokenOnomatopeia = subscribe("ONOMATOPOEIA", () => {
    //   _fetchRandomAnimation(controller);
    // });

    return () => {
      controller.abort();
      // unsubscribe(tokenRoute);
      // unsubscribe(tokenOnomatopeia);
    };
  }, []);

  useEffect(() => {
    console.log(animationRef);
  }, [animation]);

  // const _fetchAnimation = (controller: AbortController) => {
  //   const fetchData = async () => {
  //     const data = await fetch(file.toString(), { signal: controller.signal });
  //     const json = await data.json();
  //     if (json.layers) {
  //       setAnimation(json);
  //     }
  //   };

  //   fetchData().catch(console.error);
  // };

  const eventListeners: EventListener[] = [
    {
      eventName: "loaded_images",
      callback: () => {
        console.log("eventListeners: loaded_images");
        console.log("animationRef", animationRef.current);
        // setVisible(true);
        // setTimeout(() => {
        //   setAutoplay(true);
        // }, 1000);
      },
    },
    {
      eventName: "complete",
      callback: () => {
        console.log("eventListeners: completed:");
        if (count === 0) {
          setVisible(true);
        }
        setCount((prev) => prev + 1);
      },
    },

    // {
    //   eventName: "DOMLoaded",
    //   callback: () => {
    //     console.log("DOMLoaded:");
    //     // if (animationRef.current) animationRef.current.refs.animation.play();
    //   },
    // },
  ];
  // console.log("visible", visible);

  const defaultOptions = {
    loop: false,
    // autoplay: true,
    animationData: file,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      hideOnTransparent: false,
    },
  };

  return (
    <div className={clsx("lottie-player")}>
      <div
        className={clsx(
          " transition-opacity",
          visible ? "opacity-100" : "opacity-0",
          visible && "bg-red"
        )}>
        <Lottie
          ref={animationRef}
          speed={1}
          options={defaultOptions}
          direction={direction}
          eventListeners={eventListeners}
        />
      </div>
    </div>
  );
};

export default LottiePlayer;
