import { ScrollerVideoUI } from "@/app/types/schema";
import ScrollerVideoItemComponent from "./ScrollerVideoItem";
import "./ScrollerVideoUI.scss";
import { useEffect, useState } from "react";

type Props = {
  input: ScrollerVideoUI;
};

const ModuleScrollerVideoUI = ({ input }: Props) => {
  const { title, items } = input;

  // const [canPlay, setCanPlay] = useState(false);
  // useEffect(() => {
  //   // setCanPlay(true);
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           setCanPlay(true);
  //         }
  //       });
  //     },
  //     {
  //       threshold: 0.2,
  //     },
  //   );
  //   observer.observe(document.querySelector(".scroller-video-item")!);
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  return (
    <section className='module module--scroller-video-ui'>
      {items?.map((item, i) => (
        <ScrollerVideoItemComponent key={i} input={item} />
      ))}
      <div className='timeline'>
        <div className='inner'>Suivant</div>
      </div>
      {/* <pre>{JSON.stringify(input, null, 2)}</pre> */}
    </section>
  );
};

export default ModuleScrollerVideoUI;
