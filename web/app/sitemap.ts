import type { MetadataRoute } from "next";
import website from "./config/website";
import { getAllArticles, getAllPages } from "./sanity-api/sanity-queries";
import { _linkResolver } from "./sanity-api/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPages();
  const articles = await getAllArticles();
  return [
    {
      url: website.url,
      lastModified: new Date(),
    },
    ...pages.map((item) => ({
      url: `${website.url}${_linkResolver(item)}`,
      lastModified: item._updatedAt,
    })),
    ...articles.map((item) => ({
      url: `${website.url}${_linkResolver(item)}`,
      lastModified: item._updatedAt,
    })),
  ];
}
