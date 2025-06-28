// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import react from "@astrojs/react";

import { loadEnv } from "vite";

import node from "@astrojs/node";
import { SANITY_ENV } from "./sanity.env";

const { SANITY_API_READ_TOKEN } =
  /** @type {ImportMetaEnv} */
  (
    loadEnv(
      /** @type {string} */
      (process.env.NODE_ENV),
      process.cwd(),
      ""
    )
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
    },
  },
  integrations: [
    sanity({
      ...SANITY_ENV,
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
