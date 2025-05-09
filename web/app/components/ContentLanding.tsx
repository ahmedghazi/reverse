"use client";
import { subscribe, unsubscribe } from "pubsub-js";
import React, { useEffect } from "react";
import { Landing } from "../types/schema";
// import ContentModules from "./ContentModules";
import Modules from "./modules";

type Props = {
  input: Landing;
};

const ContentLanding = ({ input }: Props) => {
  // const [ready, setReady] = React.useState(false);
  // useEffect(() => {
  //   const token = subscribe("LOTTIE_READY", (msg: string, data: any) => {
  //     setReady(true);
  //   });

  //   return () => {
  //     unsubscribe(token);
  //   };
  // }, []);
  return (
    <div className='content content--landing'>
      <div className='spacer-hh' />
      <div className='content__inner'>
        {input.modules && <Modules input={input.modules} />}
      </div>
    </div>
  );
};

export default ContentLanding;
