"use client";

import React from "react";
import { Article } from "../types/schema";
import Figure from "./ui/Figure";
import { _linkResolver, _localizeField } from "../sanity-api/utils";
import Link from "next/link";

type Props = {
  input: Article;
};

const CardArticle = ({ input }: Props) => {
  const { title, tag, imageCover, chapo } = input;
  return (
    <div className='card card--article'>
      <Link href={_linkResolver(input)}>
        <div className='inner'>
          <div className='card-media'>
            {imageCover && imageCover.asset && (
              <Figure asset={imageCover.asset} />
            )}
          </div>
          <div className='card-content'>
            <div className='card--header'>
              <h3>{_localizeField(title)}</h3>
              <div className='tag'>{tag}</div>
            </div>
            {chapo && <p>{_localizeField(chapo)}</p>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardArticle;
