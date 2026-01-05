"use client";
import React, { useEffect, useState } from "react";
import { Settings } from "../types/schema";
import LogoReverse from "./ui/LogoReverse";
import { useScroll } from "../hooks/useScroll";
import { _linkResolver, _localizeField } from "../sanity-api/utils";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  settings: Settings;
};

const Header = ({ settings }: Props) => {
  const { scrollY } = useScroll();
  const { baseline, contact, navPrimary } = settings;
  return (
    <header
      className={clsx(
        scrollY > 10 && "is-below"
        // headerClass
        // scrollY > 100 ? `is-${scrollDirection}` : "",
        // isBottom ? "is-bottom" : ""
      )}>
      <div className='flex justify-between'>
        <Link href='/'>
          <div className='site-name'>
            <LogoReverse baseline={baseline || ""} />
          </div>
        </Link>
        <ul className='flex justify-end items-center gap-md'>
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
              <a className='cta' href={`mailto:${contact.link}`}>
                {contact.label}
              </a>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
