import { defineQuery, groq } from "next-sanity";
import { sanityFetch } from "./sanity.live";
import { Article, Landing, PageModulaire, Settings } from "../types/schema";
import { articleCard, blockContent, modules, seo } from "./fragments";
// import { revalidatePath } from "next/cache";

/*****************************************************************************************************
 * SETTINGS
 */
export const settingsQuery = defineQuery(`*[_type == "settings"][0]{
  ...,
  isDark,
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

}`);

export async function getSettings(): Promise<Settings> {
  const { data } = await sanityFetch({ query: settingsQuery });
  return data as Settings;
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

// stega: false for strings that end up outside the DOM (metadata, <title>…)
export async function getLanding(stega?: boolean): Promise<Landing> {
  const { data } = await sanityFetch({ query: LANDING_QUERY, stega });
  return data as Landing;
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
  layoutDark,
  modules[]{
    ${modules}
  }
}`);

export async function getPageModulaire(
  slug: string,
  stega?: boolean,
): Promise<PageModulaire> {
  const { data } = await sanityFetch({
    query: PAGE_MODULAIRE_QUERY,
    params: { slug: slug },
    stega,
  });
  return data as PageModulaire;
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

export async function getArticle(
  slug: string,
  stega?: boolean,
): Promise<Article> {
  const { data } = await sanityFetch({
    query: ARTICLE_QUERY,
    params: { slug: slug },
    stega,
  });
  return data as Article;
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
  const { data } = await sanityFetch({
    query: ALL_PAGES_QUERY,
    perspective: "published",
    stega: false,
  });
  return data as PageModulaire[];
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
  const { data } = await sanityFetch({
    query: ALL_ARTICLE_QUERY,
    perspective: "published",
    stega: false,
  });
  return data as Article[];
}
