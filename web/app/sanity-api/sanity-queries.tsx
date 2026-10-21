import { defineQuery, groq } from "next-sanity";
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

export const LANDING_QUERY = defineQuery(`*[_type == "landing"][0]{
  ...,
  seo{
    ${seo}
  },
  modules[]{
    ${modules}
  }
}`);

export async function getLanding(): Promise<Landing> {
  return sanityFetch({
    query: LANDING_QUERY,
    tags: ["landing"],
  });
}

/*****************************************************************************************************
 * PAGE MODULAIRE
 */
export const PAGE_MODULAIRE_QUERY =
  defineQuery(`*[_type == "pageModulaire" && slug.current == $slug][0]{
  ...,
  seo{
    ${seo}
  },
  modules[]{
    ${modules}
  }
}`);

export async function getPageModulaire(slug: string): Promise<PageModulaire> {
  return sanityFetch({
    query: PAGE_MODULAIRE_QUERY,
    tags: ["pageModulaire"],
    qParams: { slug: slug },
  });
}

/*****************************************************************************************************
 * NEWS
 */
export const ARTICLE_QUERY =
  defineQuery(`*[_type == "article" && slug.current == $slug][0]{
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
}`);

export async function getArticle(slug: string): Promise<Article> {
  return sanityFetch({
    query: ARTICLE_QUERY,
    tags: ["article"],
    qParams: { slug: slug },
  });
}

/*****************************************************************************************************
 * ALL_PAGES_QUERY
 *
 */
export const ALL_PAGES_QUERY = defineQuery(`
  *[_type == "pageModulaire"]{
    ...
  }
`);

export async function getAllPages(): Promise<PageModulaire[]> {
  return sanityFetch({
    query: ALL_PAGES_QUERY,
    tags: ["all-pages"],
  });
}

/*****************************************************************************************************
 * ALL_PAGES_QUERY
 *
 */
export const ALL_ARTICLE_QUERY = defineQuery(`
  *[_type == "article"]{
    ...
  }
`);

export async function getAllArticles(): Promise<Article[]> {
  return sanityFetch({
    query: ALL_ARTICLE_QUERY,
    tags: ["all-articles"],
  });
}
