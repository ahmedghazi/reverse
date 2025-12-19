import { groq } from "next-sanity";
import { sanityFetch } from "./sanity.client";
import { Article, Landing, PageModulaire, Settings } from "../types/schema";
import { articleCard, blockContent, modules, seo } from "./fragments";
// import { revalidatePath } from "next/cache";

/*****************************************************************************************************
 * SETTINGS
 */
export const settingsQuery = groq`*[_type == "settings"][0]{
  ...,

  navPrimary[]{
    ...,
    _type == 'linkInternal' => {
      ...,
      link->{
        _type,
        slug,
      },
    },
  },
  navTertiary[]{
    ...,
    _type == 'linkInternal' => {
      ...,
      link->{
        _type,
        slug,
      },
    },
  }

}`;

export async function getSettings(): Promise<Settings> {
  return sanityFetch({
    query: settingsQuery,
    tags: ["settings"],
  });
  // return client.fetch(

  // );
}

// /*****************************************************************************************************
//  * landing
//  */

export const LANDING_QUERY = groq`*[_type == "landing"][0]{
  ...,
  seo{
    ${seo}
  },
  modules[]{
    ${modules}
  }
}`;

export async function getLanding(): Promise<Landing> {
  return sanityFetch({
    query: LANDING_QUERY,
    tags: ["landing"],
  });
}

// /*****************************************************************************************************
//  * Home
//  */

// export const homeQuery = groq`*[_type == "home"][0]{
//   ...,
//   seo{
//     ${seo}
//   },

// }`;

// export async function getHome(): Promise<Home> {
//   return sanityFetch({
//     query: homeQuery,
//     tags: ["home"],
//   });
// }

/*****************************************************************************************************
 * PAGE MODULAIRE
 */
export const PAGE_MODULAIRE_QUERY = groq`*[_type == "pageModulaire" && slug.current == $slug][0]{
  ...,
  seo{
    ${seo}
  },
  modules[]{
    ${modules}
  }
}`;

export async function getPageModulaire(slug: string): Promise<PageModulaire> {
  console.log("----------- getPageModulaire slug", slug);
  return sanityFetch({
    query: PAGE_MODULAIRE_QUERY,
    tags: ["pageModulaire"],
    qParams: { slug: slug },
  });
}

/*****************************************************************************************************
 * NEWS
 */
export const ARTICLE_QUERY = groq`*[_type == "article" && slug.current == $slug][0]{
  ...,
  seo{
    ${seo}
  },
  imageCover{
    asset->
  },
  text{
    ${blockContent}
  },
  related[]->{
    ${articleCard}
  }
}`;

export async function getArticle(slug: string): Promise<Article> {
  return sanityFetch({
    query: ARTICLE_QUERY,
    tags: ["article"],
    qParams: { slug: slug },
  });
}

// /*****************************************************************************************************
//  * LOCATION
//  */
// export const locationQuery = groq`*[_type == "location" && slug.current == $slug][0]{
//   ...,
//   seo{
//     ${seo}
//   },
//   modules[]{
//     ${modules}
//   }
// }`;

// export async function getlocation(slug: string): Promise<Location> {
//   return sanityFetch({
//     query: locationQuery,
//     tags: ["location"],
//     qParams: { slug: slug },
//   });
//   // return cachedClient(pageModulaireQuery, { slug: slug });
// }

// /*****************************************************************************************************
//  * EVENT
//  */
// export const eventQuery = groq`*[_type == "event" && slug.current == $slug][0]{
//   ...,
//   seo{
//     ${seo}
//   },
//   modules[]{
//     ${modules}
//   }
// }`;

// export async function getSingleEvent(slug: string): Promise<Event> {
//   return sanityFetch({
//     query: eventQuery,
//     tags: ["event"],
//     qParams: { slug: slug },
//   });
//   // return cachedClient(pageModulaireQuery, { slug: slug });
// }
