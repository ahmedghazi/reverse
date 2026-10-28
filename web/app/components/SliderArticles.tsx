import React, { useEffect, useRef, useState } from "react";
import { Article, LocaleString } from "../types/schema";
import CardArticle from "./CardArticle";
import ReactSlick from "react-slick";
import { _localizeField } from "../sanity-api/utils";
import { stegaClean } from "next-sanity";
import clsx from "clsx";

type Props = {
  items: Article[];
  title: string;
  layout: "isSlider" | "isGrid" | undefined;
  cols?: number;
};

const SliderArticles = ({
  items,
  title,
  layout = "isSlider",
  cols = 3,
}: Props) => {
  let sliderRef = useRef<any>(null);
  // react-slick 0.31 `responsive` only reacts to resize, not the initial width
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const next = () => {
    sliderRef.current?.slickNext();
  };
  const previous = () => {
    sliderRef.current?.slickPrev();
  };
  const settings = {
    autoplay: false,
    slidesToShow: isMobile ? 1 : cols,
    slidesToScroll: 1,
    infinite: true,
    centerPadding: "15px",
    centerMode: !isMobile,
  };
  return (
    <div className={clsx("snap", `${layout}-articles}`)} id='news'>
      {title && (
        <div className='header'>
          <div className='grid grid-cols-3 items-center'>
            <div className=''></div>

            <h2>{stegaClean(title)}</h2>
            {layout === "isSlider" && (
              <div className='slider-controls'>
                <button className='button' onClick={previous}>
                  <svg
                    width='13'
                    height='22'
                    viewBox='0 0 13 22'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M10.6562 0.5C10.7888 0.5 10.916 0.552771 11.0098 0.646484L12.2988 1.93457C12.494 2.1297 12.4937 2.44631 12.2988 2.6416L4.28418 10.6562L12.2988 18.6709C12.3925 18.7646 12.4453 18.8919 12.4453 19.0244C12.4453 19.1569 12.3925 19.2842 12.2988 19.3779L11.0098 20.666C10.8145 20.8613 10.498 20.8613 10.3027 20.666L0.646484 11.0098C0.552772 10.916 0.5 10.7888 0.5 10.6562C0.500047 10.5237 0.552758 10.3965 0.646484 10.3027L10.3027 0.646484C10.3965 0.552758 10.5237 0.500047 10.6562 0.5Z'
                      fill='white'
                      stroke='white'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
                <button className='button' onClick={next}>
                  <svg
                    width='13'
                    height='22'
                    viewBox='0 0 13 22'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M2.2887 20.8127C2.15613 20.8127 2.02894 20.76 1.93518 20.6663L0.646118 19.3782C0.45099 19.183 0.451256 18.8664 0.646118 18.6711L8.66077 10.6565L0.64612 2.64184C0.552491 2.5481 0.499635 2.42083 0.499635 2.28833C0.499661 2.15582 0.552453 2.02855 0.64612 1.93481L1.93518 0.646728C2.13044 0.451466 2.44695 0.451466 2.64221 0.646728L12.2985 10.303C12.3922 10.3967 12.4449 10.5239 12.4449 10.6565C12.4449 10.789 12.3922 10.9163 12.2985 11.01L2.64221 20.6663C2.54849 20.76 2.42124 20.8127 2.2887 20.8127Z'
                      fill='white'
                      stroke='white'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <div className='items'>
        {items && layout === "isSlider" && (
          <ReactSlick ref={sliderRef} {...settings}>
            {items.map((item) => (
              <CardArticle key={item._id} input={item} />
            ))}
          </ReactSlick>
        )}
        {items && layout === "isGrid" && (
          <div className='grid md:grid-cols-3 gap-md px-md md:px-xl gap-y-xl'>
            {items.map((item) => (
              <CardArticle key={item._createdAt} input={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SliderArticles;
