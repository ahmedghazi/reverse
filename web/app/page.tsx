import { Metadata } from "next";
import website from "./config/website";
import { getLanding } from "./sanity-api/sanity-queries";
import { notFound } from "next/navigation";
import ContentLanding from "./components/ContentLanding";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getLanding(false);
  return {
    title: `${data?.seo?.metaTitle || data?.title?.fr || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset.url || website.image,
    },
  };
}

const HomePage = async function Page() {
  const data = await getLanding();
  if (!data) return notFound();
  return (
    <div className='template template--home ' data-template='home'>
      <ContentLanding input={data} />
    </div>
  );
};

export default HomePage;
