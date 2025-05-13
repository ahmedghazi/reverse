import React, { useRef } from "react";
import { BlockContent } from "../../types/schema";
import { PortableText } from "next-sanity";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  text: BlockContent;
};

const TextIndentedAndAnimated = ({ text }: Props) => {
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // return;
      const texts = container.current?.querySelectorAll("p");
      if (!texts) return;

      const text = new SplitType(texts, {
        types: "lines,words,chars",
        tagName: "span",
      });

      gsap.from(text.words, {
        y: "1em",
        opacity: 0,
        duration: 1,
        ease: "power3.inOut",
        // stagger: 0.1 / 1,
        stagger: 0.1 / 2,
        scrollTrigger: {
          trigger: container.current,
          start: "top-=100 bottom-=100", // Triggers when element is 100px from bottom of viewport
          end: "bottom top", // Ends when element leaves viewport
          toggleActions: "restart none none reset", // Key change: restart animation on each scroll
          // markers: true,
        },
      });
      // Cleanup split text on component unmount
      return () => {
        text.revert();
      };
    },
    { scope: container }
  );

  return (
    <div className='text-indented-and-animated uppercase' ref={container}>
      <PortableText value={text} components={portableTextComponents} />
    </div>
  );
};

export default TextIndentedAndAnimated;
