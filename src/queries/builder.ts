import { createGroqBuilder, makeSafeQueryRunner } from "groqd";
import { sanityClient } from "sanity:client";
import type * as Sanity from "../sanity/types";
import {
  PUBLIC_SANITY_VISUAL_EDITING_ENABLED,
  SANITY_API_READ_TOKEN,
} from "astro:env/server";

const visualEditingEnabled = PUBLIC_SANITY_VISUAL_EDITING_ENABLED;
const token = SANITY_API_READ_TOKEN;

export const runQuery = makeSafeQueryRunner(async (query, { parameters }) => {
  if (visualEditingEnabled && !token) {
    throw new Error(
      "The `SANITY_API_READ_TOKEN` environment variable is required during Visual Editing."
    );
  }

  const perspective = visualEditingEnabled ? "drafts" : "published";

  const { result } = await sanityClient.fetch(query, parameters, {
    filterResponse: false,
    perspective,
    resultSourceMap: visualEditingEnabled ? "withKeyArraySelector" : false,
    stega: visualEditingEnabled,
    ...(visualEditingEnabled ? { token } : {}),
    useCdn: !visualEditingEnabled,
  });

  return result;
});

interface SchemaConfig {
  schemaTypes: Sanity.AllSanitySchemaTypes;
  referenceSymbol: typeof Sanity.internalGroqTypeReferenceTo;
}

/** A typed GROQ query builder made with `groqd` */
export const q = createGroqBuilder<SchemaConfig>({});
