"use client";
import React, { FC, useEffect, useState, useRef } from "react";
import Lottie from "react-lottie-player";
import clsx from "clsx";
import { publish, subscribe, unsubscribe } from "pubsub-js";

type Props = {
  file: string | any;
  direction: number | any;
};

const LottiePlayerAlt: FC<Props> = ({ file, direction }) => {
  const [visible, setVisible] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(true);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    const token = subscribe("DOC_READY", () => {
      lottieRef.current?.goToAndPlay(0);
    });

    return () => {
      unsubscribe(token);
    };
  }, []);
  //   // console.log(count);
  //   // console.log(lottieRef.current);
  //   if (count === 1) {
  //     setVisible(true);
  //     lottieRef.current.goToAndPlay(0);
  //     publish("LOTTIE_READY");
  //   }
  // }, [count]);

  // useEffect(() => {
  //   if(lottieRef.current) {
  //     const
  //   }
  // }, []);

  return (
    <div
      className={clsx(
        "lottie-player transition-opacity"
        // visible ? "opacity-100" : "opacity-50"
      )}>
      <Lottie
        ref={lottieRef}
        animationData={file}
        loop={false}
        play={play}
        direction={direction}
        speed={1.5}
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        style={{ width: "100%", height: "100%" }}
        onComplete={() => {
          console.log("Lottie onComplete");
          // setCount((prev) => prev + 1);
        }}
      />
    </div>
  );
};

export default LottiePlayerAlt;
