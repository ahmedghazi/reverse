import { draftMode } from "next/headers";
import { Metadata } from "next";
import website from "./config/website";
import { getLanding, LANDING_QUERY } from "./sanity-api/sanity-queries";
import { Landing } from "./types/schema";
// import { getClient } from "./sanity-api/sanity-client";
import { notFound } from "next/navigation";
import ContentLanding from "./components/ContentLanding";
import { getClient } from "./sanity-api/sanity.client";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getLanding();
  return {
    title: `${data?.seo?.metaTitle || data?.title?.fr || ""}`,
    description: data?.seo?.metaDescription,
    openGraph: {
      images: data?.seo?.metaImage?.asset.url || website.image,
    },
  };
}

// type PageProps = {
//   params: {
//     slug: string;
//   };
// };

const HomePage = async function Page() {
  const { isEnabled } = await draftMode();

  let data: Landing;
  if (isEnabled) {
    data = await getClient({ token: process.env.SANITY_API_READ_TOKEN }).fetch(
      LANDING_QUERY
    );
  } else {
    data = (await getLanding()) as Landing;
  }
  // console.log(data);
  if (!data) return notFound();
  return (
    <div className='template template--home ' data-template='home'>
      <ContentLanding input={data} />
    </div>
  );
};

export default HomePage;
