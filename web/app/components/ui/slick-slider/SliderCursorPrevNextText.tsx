import React, { useEffect, useRef, useState } from "react";
// import PubSub from "pubsub-js";
import styled from "styled-components";
import IcoNext from "./IcoNext";
import IcoPrev from "./IcoPrev";
import useDeviceDetect from "@/app/hooks/useDeviceDetect";

interface ContainerProps {
  left: Boolean;
}

// const Container = styled.div<ContainerProps>`
//   position: absolute;
//   top: 0;
//   left: ${(props) => props.left};
//   width: 50%;
//   height: 100%;
//   z-index: 49;
//   cursor: none;
//   @media all and (max-width: 1080px) {
//     opacity: 0;
//   }
//   &:hover .label {
//     opacity: 1;
//   }
//   * {
//     pointer-events: none;
//   }
// `;

const Label = styled.div`
  opacity: 0;
  position: absolute;
  will-change: transform;
  transform: translate(-100vw, -100vh);
  transform-origin: center center;
  text-align: center;
  font-size: 2em;
  // color: white;
  // mix-blend-mode: difference;
`;

const SliderCursorPrevNextText = (props: any) => {
  // console.log(props);
  const { label, left, className, style, onClick } = props;
  const refContainer = useRef<HTMLDivElement>(null);
  const refLabel = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceDetect();
  const [positions, setPositions] = useState({
    transform: "translate(-100vw, -100vh)",
  });

  useEffect(() => {
    if (refContainer.current) {
      refContainer.current.addEventListener("mouseenter", _onEnter);
      refContainer.current.addEventListener("mouseleave", _onLeave);
    }
    return () => {
      if (refContainer && refContainer.current) {
        refContainer.current.removeEventListener("mouseenter", _onEnter);
        refContainer.current.removeEventListener("mouseleave", _onLeave);
        refContainer.current.removeEventListener("mousemove", _update);
      }
    };
  }, []);

  useEffect(() => {
    setPositions({ transform: `translate(${0}%, ${-50}%)` });
  }, [isMobile]);

  const _onEnter = () => {
    if (refContainer.current)
      refContainer.current.addEventListener("mousemove", _update);
  };
  const _onLeave = () => {
    if (refContainer.current)
      refContainer.current.removeEventListener("mousemove", _update);
  };

  const _update = (e: any) => {
    if (isMobile) return;
    // const { offsetX, offsetY } = e;
    if (!refLabel.current) return;
    const { width, height } = refLabel.current.getBoundingClientRect();
    const left = e.offsetX - width / 2;
    const top = e.offsetY - height / 2;
    setPositions({
      transform: `translate(${left}px, ${top}px)`,
    });
  };

  return (
    <div
      className={`slider-cursor-prev-next ${className}  hidden-sm`}
      style={{ ...style }}
      onClick={onClick}
      // left={left}
      ref={refContainer}>
      <div className='label' style={positions} ref={refLabel}>
        {/* {label} */}
        {label === "prev" && <IcoPrev />}
        {label === "next" && <IcoNext />}
        {/* {label === "prev" && <i className='icon-chevron-w  font-black'></i>}
        {label === "next" && <i className='icon-chevron-e  font-black'></i>} */}
      </div>
    </div>
  );
};

export default SliderCursorPrevNextText;
