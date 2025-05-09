"use client";
import React from "react";
import { Settings } from "../types/schema";
import LogoReverse from "./ui/LogoReverse";
import { useScroll } from "../hooks/useScroll";
import { _localizeField } from "../sanity-api/utils";

type Props = {
  settings?: Settings | null;
};

const Header = ({ settings }: Props) => {
  const { scrollDirection, isBottom } = useScroll();
  return (
    <header className={`is-${scrollDirection} ${isBottom ? "is-bottom" : ""}`}>
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
