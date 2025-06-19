/// <reference types="astro/client" />
///// <reference types="@sanity/astro/module" />
/// <reference path="sanity/types.ts" />

declare module "sanity:client" {
  export const sanityClient: import("@sanity/client").SanityClient;
}

declare module "sanity:studio" {
  export const studioConfig: import("sanity").Config;
}

interface ImportMetaEnv {
  readonly SANITY_API_READ_TOKEN: string;
  readonly SANITY_STUDIO_PREVIEW_URL: string;
  readonly PUBLIC_SANITY_VISUAL_EDITING_ENABLED: string;
  readonly PUBLIC_SANITY_DATASET: string;
  readonly PUBLIC_SANITY_PROJECT_ID: string;
}
