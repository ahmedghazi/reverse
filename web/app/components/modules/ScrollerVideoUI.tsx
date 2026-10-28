import { ScrollerVideoUI } from "@/app/types/schema";
import ScrollerVideoItemComponent from "./ScrollerVideoItem";
import "./ScrollerVideoUI.scss";
import { useRef, useState } from "react";
import website from "@/app/config/website";
import NavSocial from "../ui/NavSocial";
import ScrollerVirtual, { ScrollerVirtualHandle } from "../ui/ScrollerVirtual";

type Props = {
  input: ScrollerVideoUI;
};

const ModuleScrollerVideoUI = ({ input }: Props) => {
  const { title, items } = input;
  // single source of truth: the scroller position (0–1).
  // index is derived from it, so slide, index and timeline always agree
  // (items are all one screen high: progress = index / (total - 1))
  const [progress, setProgress] = useState<number>(0);
  const scrollerRef = useRef<ScrollerVirtualHandle>(null);
  const total = items?.length ?? 0;
  const index = total > 1 ? Math.round(progress * (total - 1)) : 0;

  // virtual scroll (translate3d): no native scroll, so drive it through its ref.
  // keyboard is already handled by ScrollerVirtual
  const _onPrev = () => {
    scrollerRef.current?.goTo(index - 1);
  };

  const _onNext = () => {
    scrollerRef.current?.goTo(index + 1);
  };

  if (!items) return null;

  return (
    <section className='module module--scroller-video-ui'>
      <ScrollerVirtual
        ref={scrollerRef}
        className=''
        speed={1.4}
        skew={6}
        onScroll={(_y, p) => setProgress(p)}>
        {items?.map((item, i) => (
          <div className='item' key={i} data-scroller-index={i}>
            <ScrollerVideoItemComponent input={item} initialInView={i === 0} />
          </div>
        ))}
      </ScrollerVirtual>

      <div className='controls'>
        <div className='inner'>
          {index}
          <svg
            className={index > 0 ? "" : "disabled"}
            aria-label='previous slide'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            viewBox='0 0 27.146 13.238'
            onClick={_onPrev}>
            <path d='M13.459 0.005 C13.181 0.029 12.917 0.141 12.706 0.325 L0.488 10.891 C0.351 11.003 0.237 11.142 0.154 11.298 C0.071 11.455 0.02 11.627 0.005 11.803 C-0.01 11.98 0.01 12.158 0.065 12.326 C0.12 12.495 0.208 12.65 0.325 12.784 C0.441 12.918 0.583 13.027 0.743 13.104 C0.902 13.182 1.075 13.227 1.252 13.236 C1.429 13.245 1.606 13.219 1.773 13.158 C1.94 13.097 2.092 13.004 2.222 12.883 L13.573 3.07 L24.924 12.883 C25.054 13.004 25.206 13.097 25.373 13.158 C25.539 13.219 25.716 13.245 25.893 13.236 C26.07 13.227 26.244 13.182 26.403 13.104 C26.562 13.027 26.705 12.918 26.821 12.784 C26.937 12.65 27.026 12.495 27.08 12.326 C27.135 12.158 27.156 11.98 27.141 11.803 C27.125 11.627 27.075 11.455 26.992 11.298 C26.909 11.142 26.795 11.003 26.658 10.891 L14.44 0.325 C14.306 0.208 14.15 0.12 13.982 0.065 C13.814 0.01 13.636 -0.01 13.459 0.005 Z' />
          </svg>
          <div className='timeline'>
            <div
              className='progress'
              style={{
                top: `calc(${progress} * (100% - 3em))`,
              }}></div>
          </div>

          <svg
            className={index < items?.length - 1 ? "" : "disabled"}
            aria-label='next slide'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            viewBox='0 0 27.146 13.238'
            onClick={_onNext}>
            <path d='M13.686 13.233 C13.965 13.209 14.229 13.097 14.44 12.913 L26.657 2.346 C26.795 2.234 26.909 2.096 26.992 1.94 C27.075 1.783 27.125 1.611 27.141 1.435 C27.156 1.258 27.135 1.08 27.08 0.912 C27.026 0.743 26.937 0.587 26.821 0.454 C26.705 0.32 26.562 0.211 26.403 0.133 C26.244 0.056 26.07 0.011 25.893 0.002 C25.716 -0.007 25.539 0.019 25.373 0.08 C25.206 0.14 25.054 0.234 24.924 0.355 L13.573 10.168 L2.222 0.355 C2.092 0.234 1.94 0.14 1.773 0.08 C1.606 0.019 1.429 -0.007 1.252 0.002 C1.075 0.011 0.902 0.056 0.743 0.133 C0.583 0.211 0.441 0.32 0.325 0.454 C0.208 0.587 0.12 0.743 0.065 0.912 C0.01 1.08 -0.01 1.258 0.005 1.435 C0.02 1.611 0.071 1.783 0.154 1.94 C0.237 2.096 0.351 2.234 0.488 2.346 L12.706 12.913 C12.84 13.029 12.995 13.118 13.164 13.173 C13.332 13.227 13.51 13.248 13.686 13.233 Z' />
          </svg>
        </div>
      </div>
      <div className='footer'>
        <div className='credits'>
          <div>
            {website.title} © {new Date().getFullYear()}
          </div>
        </div>
        <NavSocial />
      </div>
      {/* <pre>{JSON.stringify(input, null, 2)}</pre> */}
    </section>
  );
};

export default ModuleScrollerVideoUI;
