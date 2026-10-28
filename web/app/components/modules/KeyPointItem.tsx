"use client";
import React, { useEffect } from "react";
import { PortableText } from "@portabletext/react";
import Figure from "@/app/components/ui/Figure";
import { KeyPoint } from "@/app/types/schema";
import { _localizeField } from "@/app/sanity-api/utils";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import Image from "next/image";
import { getCssFilterByHex } from "@/app/lib/utils";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import useDeviceDetect from "@/app/hooks/useDeviceDetect";
import { stegaClean } from "next-sanity";

type KeyPointProps = {
  input: KeyPoint;
};

const KeyPointItem = ({ input }: KeyPointProps) => {
  const { title, description, image, color } = input;
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.9,
    trackVisibility: true,
    delay: 100,
  });
  const { isMobile } = useDeviceDetect();

  useEffect(() => {
    const parent = entry?.target.parentElement?.parentElement as HTMLElement;
    if (!parent) return;
    parent.classList.toggle("has-child-inview", inView);
    parent.style.setProperty("--color", color || "");
    if (inView) {
      const filterColor = getCssFilterByHex(color || "");
      document.documentElement.style.setProperty("--color", color || "");
      document.documentElement.style.setProperty(
        "--filterColor",
        filterColor || "",
      );
    } else {
      document.documentElement.style.removeProperty("--filterColor");
      document.documentElement.style.removeProperty("--color");
    }
  }, [inView]);

  const style = { "--color": color } as React.CSSProperties;
  return (
    <div
      className={clsx("item keypoint snap", { "is-inview": inView })}
      style={style}>
      <div className='inner relative' ref={ref}>
        {image && image.image && image.imageMobile && (
          <Image
            src={
              isMobile ? image.imageMobile?.asset.url : image.image.asset.url
            }
            width={1854}
            height={1022}
            alt={image.image.alt || ""}
            sizes='100vw'
          />
        )}
        <div className='body relative'>
          <div className='grid md:grid-cols-12 gap-md items-baseline '>
            <div className='col-span-3'></div>
            <div className='col-span-3'>
              <div className='title'>{_localizeField(title)}</div>
            </div>
            <div className='col-span-6'>
              <div className='text'>
                <PortableText
                  value={stegaClean(_localizeField(description))}
                  components={portableTextComponents}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyPointItem;
