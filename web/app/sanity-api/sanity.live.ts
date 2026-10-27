import { defineLive } from "next-sanity/live";
import { client } from "./sanity.client";
import { token } from "./sanity.api";

// Centralised fetch: perspective + stega (click-to-edit) + live updates,
// driven automatically by Next's draftMode.
// <SanityLive /> (layout) revalidates the pages on publish, no webhook needed.
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
