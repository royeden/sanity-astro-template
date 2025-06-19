import { visionTool } from "@sanity/vision";
import { pages } from "@tinloof/sanity-studio";
import { defineConfig } from "sanity";
import { media } from "sanity-plugin-media";
// import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { SANITY_ENV } from "./sanity.env";

export default defineConfig({
  name: "default",
  title: "Astro-Sanity",

  ...SANITY_ENV,

  plugins: [
    structureTool(),
    visionTool(),
    pages({
      previewUrl: import.meta.env.SANITY_STUDIO_PREVIEW_URL,
      creatablePages: ["page"],
    }),
    // presentationTool({
    //   previewUrl: import.meta.env.SANITY_STUDIO_PREVIEW_URL,
    // }),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
});
