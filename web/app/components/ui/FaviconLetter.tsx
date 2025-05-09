"use client";
import { usePageContext } from "@/app/context/PageContext";
import { i } from "framer-motion/client";
import React, { useEffect } from "react";

type Props = {
  letter: string;
};

const FaviconLetter = ({ letter = "E" }: Props) => {
  useEffect(() => {
    dynamicFavicon();
  }, []);

  const dynamicFavicon = () => {
    // console.log("dynamicFavicon", color);
    const link = document.getElementById("dynamic-favicon") as HTMLLinkElement;
    if (link) {
      link.href = renderSvgDataURI();
    } else {
      const link = document.createElement("link");
      link.id = "dynamic-favicon";
      link.rel = "shortcut icon";
      link.type = "image/svg+xml";
      link.href = renderSvgDataURI();
      document.head.appendChild(link);
    }
  };

  const renderSvgDataURI = () => {
    let dataURI = `data:image/svg+xml,`;
    dataURI += encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#fcec96"/>
        <text transform="translate(7.88 23.61)" font-size="22.83" fill="black" font-family="sans-serif">${letter}</text>
      </svg>`);

    return dataURI;
  };

  return null;
};

export default FaviconLetter;
