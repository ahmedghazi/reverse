import { groq } from "next-sanity";
import { sanityFetch } from "./sanity.client";
import { Home, Landing, PageModulaire, Settings } from "../types/schema";
import { modules, seo } from "./fragments";
// import { revalidatePath } from "next/cache";

/*****************************************************************************************************
 * SETTINGS
 */
export const settingsQuery = groq`*[_type == "settings"][0]{
  ...,

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

export const landingQuery = groq`*[_type == "landing"][0]{
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
    query: landingQuery,
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
export const pageModulaireQuery = groq`*[_type == "pageModulaire" && slug.current == $slug][0]{
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
    query: pageModulaireQuery,
    tags: ["pageModulaire"],
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
