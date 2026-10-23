"use client";
import React, { useEffect, useState } from "react";
import { Settings } from "../types/schema";
import LogoReverse from "./ui/LogoReverse";
import { useScroll } from "../hooks/useScroll";
import { _linkResolver, _localizeField } from "../sanity-api/utils";
import clsx from "clsx";
import Link from "next/link";
import Burger from "./ui/Burger";
import NavSocial from "./ui/NavSocial";
import { subscribe, unsubscribe } from "pubsub-js";

type Props = {
  settings: Settings;
};

const Header = ({ settings }: Props) => {
  const { isBelowViewPort } = useScroll({ belowThreshold: 1 });
  const { baseline, contact, navPrimary } = settings;
  const [isDark, setIsDark] = useState(false);

  // subscribe once: re-subscribing on route change left a gap where the new
  // page's LAYOUT_DARK publish found no subscriber and was dropped
  useEffect(() => {
    const token = subscribe("LAYOUT_DARK", (_e, data) => {
      setIsDark(Boolean(data));
    });
    return () => {
      unsubscribe(token);
    };
  }, []);

  return (
    <header
      className={clsx(
        isBelowViewPort && "is-below",
        // headerClass
        // scrollY > 100 ? `is-${scrollDirection}` : "",
        // isBottom ? "is-bottom" : ""
      )}>
      <div className='flex justify-between items-center'>
        <Link href='/'>
          <div className='site-name'>
            <LogoReverse
              baseline={baseline || ""}
              color={isDark ? "white" : "black"}
            />
          </div>
        </Link>
        <Burger />
        {/* {scrollY} */}
        <nav>
          <ul className='menu'>
            {navPrimary &&
              navPrimary.map((item, i) => (
                <li key={i}>
                  {item._type === "linkInternal" && (
                    <Link href={_linkResolver(item.link)}>
                      {_localizeField(item.label)}
                    </Link>
                  )}
                  {item._type === "linkAnchor" && (
                    <Link href={`/#${item.link}`}>
                      {_localizeField(item.label)}
                    </Link>
                  )}
                </li>
              ))}
            {contact && (
              <li>
                <a className='' href={`mailto:${contact.link}`}>
                  {contact.label}
                </a>
              </li>
            )}
          </ul>
          <NavSocial />
        </nav>
      </div>
    </header>
  );
};

export default Header;
