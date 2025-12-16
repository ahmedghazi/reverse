import ContentArticle from "@/app/components/ContentArticle";
import website from "@/app/config/website";
import { ARTICLE_QUERY, getArticle } from "@/app/sanity-api/sanity-queries";
import { getClient } from "@/app/sanity-api/sanity.client";
import { _localizeField } from "@/app/sanity-api/utils";
import { Article } from "@/app/types/schema";
import { Metadata, NextPage } from "next";
import { draftMode } from "next/headers";
import React from "react";

type Params = Promise<{ slug: string }>;

type PageProps = {
  params: Params;
};
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getArticle(slug);
  return {
    title: `${data?.seo?.metaTitle || data?.title?.fr || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset.url || website.image,
    },
  };
}

const FilmsPage: NextPage<PageProps> = async ({ params }) => {
  // const params = await props.params;
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  // const { isEnabled } = await draftMode();
  console.log(slug);
  let data: Article;
  if (isEnabled) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      ARTICLE_QUERY,
      { slug: slug }
    );
  } else {
    data = (await getArticle(slug)) as Article;
  }

  if (!data) return <div>please edit page</div>;
  return (
    <div className='template template--article' data-template='article'>
      <ContentArticle input={data} />
    </div>
  );
};

export default FilmsPage;
