"use client";
import React from "react";
import { PageModulaire } from "../types/schema";
import { _localizeField } from "../sanity-api/utils";
import Modules from "./modules";

type Props = {
  input: PageModulaire;
};

const ContentPageModulaire = ({ input }: Props) => {
  const { title, modules } = input;
  return (
    <div className='content--page-modulaire snap'>
      <h1>{_localizeField(title)}</h1>
      {modules && <Modules input={modules} />}
    </div>
  );
};

export default ContentPageModulaire;
