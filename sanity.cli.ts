import { defineCliConfig } from "sanity/cli";
import { SANITY_ENV } from "./sanity.env";

export default defineCliConfig({
  api: SANITY_ENV,
});
