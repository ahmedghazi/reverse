"use client";
import React, { useRef } from "react";
import { Settings } from "../types/schema";
import LogoReverse from "./ui/LogoReverse";
import { PortableText } from "next-sanity";
import portableTextComponents from "../sanity-api/portableTextComponents";
import { _linkResolver, _localizeField } from "../sanity-api/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

type Props = {
  settings?: Settings | null;
};

const Footer = ({ settings }: Props) => {
  // console.log(settings);
  const { baseline, contacts, textExtra, navTertiary } = settings || {};
  const container = useRef<HTMLDivElement | null>(null);
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  useGSAP(
    () => {
      const baseline = container.current?.querySelector(".baseline");
      const navSecondary =
        container.current?.querySelectorAll("#nav-secondary li");
      const navTertiary =
        container.current?.querySelectorAll("#nav-tertiary li");
      const copy = container.current?.querySelector(".copy");
      let tl = gsap.timeline({
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom-=100",
          end: "bottom top",
          toggleActions: "restart none none reset",
        },
      });
      tl.from(baseline!, { duration: 0.6, y: "1em", opacity: 0 })
        .from(navSecondary!, {
          duration: 0.6,
          y: "1em",
          opacity: 0,
          stagger: 0.2,
        })
        .from(navTertiary!, {
          duration: 0.6,
          y: "1em",
          opacity: 0,
          stagger: 0.2,
        })
        .from(copy!, { duration: 0.6, y: "1em", opacity: 0 });

      // Cleanup split text on component unmount
      return () => {
        // text.revert();
        tl.revert();
      };
    },
    { scope: container }
  );
  return (
    <footer className='snap'>
      <div className='inner' ref={container}>
        <div className='bloc-top baseline md:text-lg strong'>{baseline}</div>
        <nav id='nav-secondary' className='bloc-center'>
          <ul className='grid grid-cols-2  md:grid-cols-4 gap-md'>
            {contacts?.map((item) => (
              <li key={item._key}>
                <h5 className='label'>{item.key}</h5>
                <hr />
                <div className='value '>
                  <PortableText
                    value={_localizeField(item.val)}
                    components={portableTextComponents}
                  />
                </div>
              </li>
            ))}
          </ul>
        </nav>
        <div className='bloc-bottom signature text-sm'>
          <div className='md:grid md:grid-cols-2 gap-md items-baseline-'>
            <div className=''>
              <LogoReverse isYellow={true} />
            </div>
            <div className=' flex flex-col justify-end '>
              {/* <pre>{JSON.stringify(navTertiary, null, 2)}</pre> */}
              {navTertiary && (
                <nav id='nav-tertiary'>
                  <ul className=''>
                    {navTertiary.map((item) => (
                      <li key={item._key}>
                        {item._type === "linkInternal" && (
                          <Link href={_linkResolver(item.link) || "#"}>
                            {_localizeField(item.label)}
                          </Link>
                        )}
                        {item._type === "linkExternal" && (
                          <a
                            target='_blank'
                            rel='noopener noreferrer'
                            href={item.link || "#"}>
                            {item.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              <div className='copy'>
                {textExtra && <div>{textExtra}</div>}
                <div>Paris France © {new Date().getFullYear()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
