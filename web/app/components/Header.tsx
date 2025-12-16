"use client";
import React, { useEffect, useState } from "react";
import { Settings } from "../types/schema";
import LogoReverse from "./ui/LogoReverse";
import { useScroll } from "../hooks/useScroll";
import { _localizeField } from "../sanity-api/utils";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type Props = {
  settings?: Settings | null;
};

const Header = ({ settings }: Props) => {
  const { scrollY } = useScroll();

  return (
    <header
      className={clsx(
        scrollY > 10 && "is-below"
        // headerClass
        // scrollY > 100 ? `is-${scrollDirection}` : "",
        // isBottom ? "is-bottom" : ""
      )}>
      <div className='flex justify-between'>
        <div className='site-name'>
          <LogoReverse baseline={settings?.baseline || ""} />
        </div>
        <div className='flex justify-end items-center '>
          {settings?.contact && (
            <a className='cta' href={`mailto:${settings.contact.link}`}>
              {settings.contact.label}
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
