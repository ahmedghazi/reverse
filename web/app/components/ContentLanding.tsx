"use client";
import { publish, subscribe, unsubscribe } from "pubsub-js";
import React, { useEffect } from "react";
import { Landing } from "../types/schema";
// import ContentModules from "./ContentModules";
import Modules from "./modules";

type Props = {
  input: Landing;
};

const ContentLanding = ({ input }: Props) => {
  const { layoutDark, modules } = input;
  useEffect(() => {
    publish("LAYOUT_DARK", layoutDark ? true : false);
  }, [layoutDark]);

  return (
    <div className='content content--landing'>
      <div className='spacer-hh' />
      <div className='content__inner'>
        {modules && <Modules input={modules} />}
      </div>
    </div>
  );
};

export default ContentLanding;
