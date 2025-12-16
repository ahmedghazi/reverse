"use client";
import { Article, ArticlesUI, SliderArticlesUI } from "@/app/types/schema";
import React from "react";
import SliderArticles from "../SliderArticles";
import { _localizeField } from "@/app/sanity-api/utils";

type Props = {
  input: SliderArticlesUI;
};

const ModuleSliderArticlesUI = ({ input }: Props) => {
  console.log("SliderArticlesUI input:", input);
  return (
    <section className='module module--slider-articles-ui snap'>
      {input.items && (
        <SliderArticles
          items={(input.items as Article[]) || []}
          title={_localizeField(input.title) || ""}
        />
      )}
    </section>
  );
};

export default ModuleSliderArticlesUI;
