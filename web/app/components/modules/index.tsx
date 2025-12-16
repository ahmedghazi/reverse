"use client";
import React from "react";
import { SanityKeyed } from "sanity-codegen";
import {
  TextUI,
  ImagesUI,
  MediaUI,
  KeyPointsUI,
  ArticlesUI,
  SliderArticlesUI,
} from "../../types/schema";
import ModuleTextUI from "./TextUI";
import ModuleImagesUI from "./ImagesUI";
import ModuleKeyPointsUI from "./KeyPointsUI";
import ModuleMediaUI from "./MediaUI";
// import ModuleArticlesUI from "./SliderArticlesUI";
import "./index.scss";
import ModuleSliderArticlesUI from "./SliderArticlesUI";

type Props = {
  input: Array<
    | SanityKeyed<TextUI>
    | SanityKeyed<ImagesUI>
    | SanityKeyed<KeyPointsUI>
    | SanityKeyed<MediaUI>
    | SanityKeyed<SliderArticlesUI>
  >;
};

const Modules = ({ input }: Props) => {
  // console.log(input);
  const _renderModules = () => {
    const _modules = input.map(
      (
        module:
          | SanityKeyed<TextUI>
          | SanityKeyed<ImagesUI>
          | SanityKeyed<KeyPointsUI>
          | SanityKeyed<MediaUI>
          | SanityKeyed<SliderArticlesUI>
      ) => {
        console.log("Module type:", module._type);
        switch (module._type) {
          case "textUI":
            return <ModuleTextUI key={module._key} input={module} />;
          case "imagesUI":
            return <ModuleImagesUI key={module._key} input={module} />;
          case "keyPointsUI":
            return <ModuleKeyPointsUI key={module._key} input={module} />;
          case "mediaUI":
            return <ModuleMediaUI key={module._key} input={module} />;
          // case "articlesUI":
          //   return <ModuleArticlesUI key={module._key} input={module} />;
          case "sliderArticlesUI":
            return <ModuleSliderArticlesUI key={module._key} input={module} />;

          default:
            return null;
        }
      }
    );
    return _modules;
  };

  return <div className='modules'>{_renderModules()}</div>;
};

export default Modules;
