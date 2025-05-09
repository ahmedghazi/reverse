// "use client";
// import gsap from "gsap";
// import React, { useRef } from "react";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import SplitType from "split-type";

// type Props = {};

// const Presentation = (props: Props) => {
//   gsap.registerPlugin(useGSAP, ScrollTrigger);

//   const container = useRef<HTMLDivElement | null>(null);

//   useGSAP(
//     () => {
//       return
//       const texts = container.current?.querySelectorAll("p");
//       if (!texts) return;

//       const text = new SplitType(texts, {
//         types: "lines,words,chars",
//         tagName: "span",
//       });

//       gsap.from(text.words, {
//         y: "1em",
//         // x: "0.5em",
//         // scale: 0.8,
//         opacity: 0,
//         duration: 1,
//         ease: "power3.inOut",
//         stagger: 0.05,
//         scrollTrigger: {
//           trigger: container.current,
//           start: "top bottom-=100", // Triggers when element is 100px from bottom of viewport
//           end: "bottom top", // Ends when element leaves viewport
//           toggleActions: "restart none none reset", // Key change: restart animation on each scroll
//           // markers: true,
//         },
//       });
//       // Cleanup split text on component unmount
//       return () => {
//         text.revert();
//       };
//     },
//     { scope: container }
//   );

//   return (
//     <section ref={container} className='section section--presentation'>
//       <p>Remettre la publicité dans le bon sens.</p>
//       <p>
//         Nous fabriquons des pubs qui naissent dans l’énergie brute des réseaux
//         sociaux — façonnées par ses codes, sa culture, son rythme, son langage —
//         mais qui sont assez puissantes et incisives pour remonter le courant des
//         idées et se frayer un chemin jusqu’au mass media.
//       </p>
//       <p>
//         En ré-injectant la puissance de la créativité sociale dans l’écrin du
//         récit publicitaire traditionnel, nous voulons aider les marques à gagner
//         en justesse dans ...
//       </p>
//     </section>
//   );
// };

// export default Presentation;
