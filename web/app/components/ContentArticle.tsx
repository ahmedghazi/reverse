"use client";
import React from "react";
import { Article } from "../types/schema";
// import ContentModules from "./ContentModules";
import Modules from "./modules";
import { _localizeField } from "../sanity-api/utils";
import Figure from "./ui/Figure";
import { PortableText } from "next-sanity";
import portableTextComponents from "../sanity-api/portableTextComponents";
import Link from "next/link";
import CardArticle from "./CardArticle";
import SliderArticles from "./SliderArticles";

type Props = {
  input: Article;
};

const ContentArticle = ({ input }: Props) => {
  const { title, _createdAt, text, imageCover, tag, related } = input;
  return (
    <div className='content content--article snap'>
      <div className='hero'>
        {imageCover && imageCover.asset && <Figure asset={imageCover.asset} />}
      </div>
      <div className='px-md py-lg'>
        <div className='grid md:grid-cols-12 gap-md'>
          <div className='back col-span-2'>
            <Link href='/'>Back</Link>
          </div>
          <div className='col-span-10'>
            <div className='header'>
              <div className='md:grid md:grid-cols-10 gap-md items-baseline'>
                <div className='md:col-span-6'>
                  <h1 className=''>{_localizeField(title)}</h1>
                  <time dateTime={_createdAt}>
                    {new Date(_createdAt).toLocaleDateString("fr-FR")}
                  </time>
                </div>
                <div className='tag col-span-4'>{tag}</div>
              </div>
            </div>
            <div className='bodyCopy'>
              <div className='grid md:grid-cols-10 gap-md'>
                <div className='col-span-8'>
                  {text && (
                    <div className='text'>
                      <PortableText
                        value={_localizeField(text)}
                        components={portableTextComponents}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        related && (
          <div className='related'>
            <SliderArticles items={related} title='Reco' layout='isSlider' />
          </div>
        )
        // <pre>{JSON.stringify(related, null, 2)}</pre>
      }
    </div>
  );
};

export default ContentArticle;
