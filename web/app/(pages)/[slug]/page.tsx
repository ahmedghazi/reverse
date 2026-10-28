import ContentPageModulaire from "@/app/components/ContentPageModulaire";
import website from "@/app/config/website";
import { getPageModulaire } from "@/app/sanity-api/sanity-queries";
import clsx from "clsx";
import { Metadata, NextPage } from "next";
import React from "react";

type Params = Promise<{ slug: string }>;

type PageProps = {
  params: Params;
};
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPageModulaire(slug, false);
  return {
    title: `${data?.seo?.metaTitle || data?.title?.fr || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset.url || website.image,
    },
  };
}

const TemplatePage: NextPage<PageProps> = async ({ params }) => {
  const { slug } = await params;
  const data = await getPageModulaire(slug);

  if (!data) return <div>please edit page</div>;
  return (
    <div
      className={clsx("template", "template--page-modulaire", {
        "is-dark": data.layoutDark,
      })}
      data-template='page-modulaire'>
      {data && <ContentPageModulaire input={data} />}
    </div>
  );
};

export default TemplatePage;
