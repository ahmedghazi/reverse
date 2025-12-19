"use client";
import { Article, SliderArticlesUI } from "@/app/types/schema";
import React from "react";
import SliderArticles from "../SliderArticles";
import { _localizeField } from "@/app/sanity-api/utils";

type Props = {
  input: SliderArticlesUI;
};

const ModuleSliderArticlesUI = ({ input }: Props) => {
  return (
    <section className='module module--slider-articles-ui snap'>
      {input.items && (
        <SliderArticles
          items={(input.items as Article[]) || []}
          title={_localizeField(input.title) || ""}
          layout={input.layout}
          cols={input.cols}
        />
      )}
    </section>
  );
};

export default ModuleSliderArticlesUI;
