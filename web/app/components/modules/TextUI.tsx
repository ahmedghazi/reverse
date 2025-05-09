import React from "react";
import { PortableText } from "@portabletext/react";
// import portableTextComponents from "@/app/utils/portableTextComponents";
import clsx from "clsx";
import { SanityReference, TextUI } from "@/app/types/schema";
import { _localizeField } from "@/app/sanity-api/utils";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import TextIndentedAndAnimated from "../ui/TextIndentedAndAnimated";
import "./TextUI.scss";

type Props = {
  input: TextUI;
};

const ModuleTextUI = ({ input }: Props) => {
  const { look, text } = input;

  return (
    <section className={clsx("module module--text-ui snap", `text-${look}`)}>
      {look === "indentedAndAnimated" && (
        <TextIndentedAndAnimated text={_localizeField(text)} />
      )}
      {look === "normal" && (
        <PortableText
          value={_localizeField(text)}
          components={portableTextComponents}
        />
      )}
    </section>
  );
};

export default ModuleTextUI;
