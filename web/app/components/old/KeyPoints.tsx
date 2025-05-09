// "use client";
// import clsx from "clsx";
// import Image from "next/image";
// import React, { useEffect } from "react";
// import { useInView } from "react-intersection-observer";

// type KeyPointProps = {
//   title?: string;
//   text?: string;
//   image?: string;
//   background?: string;
// };

// const KeyPoint = ({ title, text, image, background }: KeyPointProps) => {
//   const { ref, inView, entry } = useInView({
//     /* Optional options */
//     threshold: 0.9,
//     trackVisibility: true,
//     delay: 100,
//   });

//   useEffect(() => {
//     const parent = entry?.target.parentElement?.parentElement as HTMLElement;
//     if (!parent) return;
//     parent.classList.toggle("has-child-inview", inView);
//     parent.style.setProperty("--color", background || "");
//   }, [inView]);

//   const style = { "--background": background } as React.CSSProperties;

//   return (
//     <div
//       className={clsx("item keypoint", { "is-inview": inView })}
//       style={style}>
//       <div className='inner' ref={ref}>
//         {image && (
//           <Image
//             src={image}
//             width={1854}
//             height={1022}
//             alt={title || ""}
//             sizes='100vw'
//           />
//         )}
//         <div className='body'>
//           <div className='grid md:grid-cols-12 gap-md items-baseline '>
//             <div className='col-span-3'></div>
//             <div className='col-span-3'>
//               <div className='title'>{title}</div>
//             </div>
//             <div className='col-span-6'>
//               <div className='text'>
//                 <p>{text}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// type KeyPointsProps = {};
// const KeyPoints = (props: KeyPointsProps) => {
//   const items = [
//     {
//       title: "thinking",
//       text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime voluptate qui velit porro dolore at soluta assumenda! Magnam, expedita maiores.",
//       image: "/1.png",
//       background: "#fcec96",
//     },
//     {
//       title: "crafting",
//       text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
//       image: "/2.png",
//       background: "#fbbb81",
//     },
//     {
//       title: "producing",
//       text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, quae.",
//       image: "/3.png",
//       background: "#acecff",
//     },
//   ];
//   return (
//     <section className='section section--keypoints'>
//       <div className='item amorce'>
//         <div className='inner'>
//           <div className='body'>
//             <div className='grid md:grid-cols-12 gap-md'>
//               <div className='col-span-3'>
//                 We Reverse
//                 <br />
//                 the way of
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {items.map((item, index) => (
//         <KeyPoint key={index} {...item} />
//       ))}
//       <div className='spacer'></div>
//     </section>
//   );
// };

// export default KeyPoints;
