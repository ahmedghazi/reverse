import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion, studioUrl } from "./sanity.api";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  // only active when draftMode is enabled (see sanity.live.ts)
  stega: { studioUrl },
});

export const sanityConfig = {
  projectId: projectId,
  dataset: dataset,
};
