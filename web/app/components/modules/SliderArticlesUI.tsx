"use client";
import { Article, SliderArticlesUI } from "@/app/types/schema";
import React from "react";
import SliderArticles from "../SliderArticles";
import { _localizeField } from "@/app/sanity-api/utils";
import "./SliderArticlesUI.scss";
import clsx from "clsx";

type Props = {
  input: SliderArticlesUI;
};

const ModuleSliderArticlesUI = ({ input }: Props) => {
  const { layout } = input;
  return (
    <section
      className={clsx("module module--slider-articles-ui snap", layout)}
      id='section-news'>
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
