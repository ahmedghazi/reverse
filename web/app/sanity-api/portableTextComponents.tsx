import { PortableTextComponents } from "@portabletext/react";
// import { urlFor } from "./sanity-utils";
// import Image from "next/image";
import Link from "next/link";
import { _linkResolver } from "./utils";
import clsx from "clsx";
// import Figure from "../components/ui/Figure";
// import clsx from "clsx";
// import { VideoWrapper } from "../components/ui/player";

const portableTextComponents: PortableTextComponents = {
  // block(props) {
  //   console.log(props)
  //   switch (props.node?.style) {
  //     case "h2":
  //       return <h2>{props.children}</h2>
  //     case "text-lg":
  //       return <p className="text-lg">{props.children}</p>
  //     case "text-xl":
  //       return <p className="text-xl">{props.children}</p>
  //     default:
  //       return <p>{props.children}</p>
  //   }
  // },
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    // "h2 text-lg": ({ children }) => (
    //   <p className='text-md md:text-lg'>{children}</p>
    // ),
    // "h2 text-2lg": ({ children }) => (
    //   <p className='text-md md:text-2lg'>{children}</p>
    // ),
    // "h3 text-2lg": ({ children }) => (
    //   <p className='text-md md:text-2lg'>{children}</p>
    // ),
    // "h3 text-lg": ({ children }) => (
    //   <p className='text-md md:text-lg'>{children}</p>
    // ),
    "text-lg": ({ children }) => (
      <p className='text-md md:text-lg'>{children}</p>
    ),
    // "text-2lg": ({ children }) => (
    //   <p className='text-md md:text-2lg '>{children}</p>
    // ),
    // "text-xl": ({ children }) => (
    //   <p className='text-md md:text-xl- headline'>{children}</p>
    // ),
  },
  types: {
    // image: ({ value }) => {
    //   return <Figure asset={value.asset} />;
    // },
    // icon: ({ value }) => {
    //   return (
    //     <div className='icon'>
    //       <Figure asset={value.image.asset} />
    //     </div>
    //   );
    // },
  },

  marks: {
    linkInternal: ({ children, value }) => {
      return <Link href={_linkResolver(value.reference)}>{children}</Link>;
    },

    linkExternal: ({ children, value }) => {
      const { href, look } = value;

      return (
        <a
          href={href}
          rel={"noreferrer noopener"}
          target='_blank'
          className={clsx("link-external", look === "cta" ? "cta" : "")}>
          <span className='flex items-baseline gap-05e'>
            <span>{children}</span>
            <svg
              version='1.1'
              id='Calque_1'
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              width='0.5em'
              height='0.5em'
              viewBox='0 0 10 10'>
              <path
                fill='var(--color)'
                d='M7.5,1.4L0,8.9L1.1,10l7.5-7.5l0,5.4l1.4,0L10,0L2.1,0l0,1.4L7.5,1.4z'
              />
            </svg>
          </span>
        </a>
      );
    },
    u: ({ children }) => <span className='word underline'>{children}</span>,
    // underline: ({ children }) => (
    //   <span className='word underline'>{children}</span>
    // ),
    highlight: ({ children }) => <em className='bg-yellow'>{children}</em>,
    align_left: ({ children }) => (
      <span className='text-left block'>{children}</span>
    ),
    align_center: ({ children }) => (
      <span className='text-center block'>{children}</span>
    ),
    align_right: ({ children }) => (
      <span className='text-right block'>{children}</span>
    ),
    // pill: ({ children, value }) => {
    //   let background = value.background;
    //   if (background && background !== "" && background.indexOf("#") === -1)
    //     background = `#${background}`;
    //   return (
    //     <span
    //       className='pill pill--md'
    //       style={{
    //         background: background,
    //       }}>
    //       {children}
    //     </span>
    //   );
    // },
  },
};

export default portableTextComponents;
