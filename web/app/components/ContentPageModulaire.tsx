"use client";
import React, { useEffect } from "react";
import { PageModulaire } from "../types/schema";
import { _localizeField } from "../sanity-api/utils";
import Modules from "./modules";
import { publish } from "pubsub-js";

type Props = {
  input: PageModulaire;
};

const ContentPageModulaire = ({ input }: Props) => {
  const { layoutDark, modules } = input;

  useEffect(() => {
    publish("LAYOUT_DARK", layoutDark ? true : false);
  }, [layoutDark]);

  return (
    <div className='content--page-modulaire snap'>
      {modules && <Modules input={modules} />}
    </div>
  );
};

export default ContentPageModulaire;
