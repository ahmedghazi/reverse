import React, { JSX } from "react";
import clsx from "clsx";
import { ImagesUI } from "@/app/types/schema";
import Figure from "../ui/Figure";
// import PreJson from "../ui/PreJson";
// import portableTextComponents from "@/app/utils/portableTextComponents";
// import { PortableText } from "@portabletext/react";

type Props = {
  input: ImagesUI;
};

const ModuleImagesUI = ({ input }: Props): JSX.Element => {
  // console.log(input);

  return (
    <section className={clsx("module module--image")}>
      {input.items &&
        input.items.map((image, i) => (
          <div className='item' key={i}>
            <Figure asset={image?.asset} width={1000} />
          </div>
        ))}
      {/* {input.image && <Figure asset={input.image?.image?.asset} width={1000} />}
      <figcaption className='py-2'>{input.image?.caption}</figcaption> */}
    </section>
  );
};

export default ModuleImagesUI;
