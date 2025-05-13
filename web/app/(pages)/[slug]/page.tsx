import Modules from "@/app/components/modules";
import website from "@/app/config/website";
import {
  getPageModulaire,
  pageModulaireQuery,
} from "@/app/sanity-api/sanity-queries";
import { getClient } from "@/app/sanity-api/sanity.client";
import { PageModulaire } from "@/app/types/schema";
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
  const data = await getPageModulaire(slug);
  return {
    title: `${data?.seo?.metaTitle || data?.title?.fr || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset.url || website.image,
    },
  };
}

const FilmsPage: NextPage<PageProps> = async (props) => {
  const params = await props.params;
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  // const { isEnabled } = await draftMode();
  let data: PageModulaire;
  if (isEnabled) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      pageModulaireQuery
    );
  } else {
    data = (await getPageModulaire(slug)) as PageModulaire;
  }

  if (!data) return <div>please edit page</div>;
  return (
    <div
      className='template template--page-modulaire'
      data-template='page-modulaire'>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {data.modules && <Modules input={data.modules} />}
    </div>
  );
};

export default FilmsPage;
