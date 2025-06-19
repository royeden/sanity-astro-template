// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import react from "@astrojs/react";

import { loadEnv } from "vite";

import node from "@astrojs/node";

/** @type {ImportMetaEnv} */
// @ts-ignore
const {
  PUBLIC_SANITY_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  SANITY_API_READ_TOKEN,
} = loadEnv(
  // @ts-ignore
  process.env.NODE_ENV,
  process.cwd(),
  ""
);

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      SANITY_API_READ_TOKEN: envField.string({
        access: "secret",
        context: "server",
      }),
      SANITY_STUDIO_PREVIEW_URL: envField.string({
        access: "secret",
        context: "server",
      }),
      PUBLIC_SANITY_VISUAL_EDITING_ENABLED: envField.boolean({
        access: "public",
        context: "server",
      }),
      PUBLIC_SANITY_DATASET: envField.string({
        access: "public",
        context: "server",
      }),
      PUBLIC_SANITY_PROJECT_ID: envField.string({
        access: "public",
        context: "server",
      }),
    },
  },
  integrations: [
    sanity({
      dataset: PUBLIC_SANITY_DATASET,
      projectId: PUBLIC_SANITY_PROJECT_ID,
      useCdn: false,
      studioBasePath: "/sanity/admin",
      stega: {
        studioUrl: "/sanity/admin",
      },
      perspective: SANITY_API_READ_TOKEN ? "drafts" : undefined,
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
