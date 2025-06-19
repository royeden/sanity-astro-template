import { defineType } from "sanity";
import alternativeText from "./alternativeText";

export default defineType({
  title: "Image with alternative text",
  name: "imageWithAlt",
  type: "image",
  options: { hotspot: true },
  fields: [alternativeText],
});
