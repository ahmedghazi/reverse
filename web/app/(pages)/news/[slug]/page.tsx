import ContentArticle from "@/app/components/ContentArticle";
import website from "@/app/config/website";
import { getArticle } from "@/app/sanity-api/sanity-queries";
import { Metadata, NextPage } from "next";
import { notFound } from "next/navigation";
import React from "react";

type Params = Promise<{ slug: string }>;

type PageProps = {
  params: Params;
};
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getArticle(slug, false);
  return {
    title: `${data?.seo?.metaTitle || data?.title?.fr || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset.url || website.image,
    },
  };
}

const FilmsPage: NextPage<PageProps> = async ({ params }) => {
  const { slug } = await params;
  const data = await getArticle(slug);

  if (!data) return notFound();
  return (
    <div className='template template--article' data-template='article'>
      <ContentArticle input={data} />
    </div>
  );
};

export default FilmsPage;
