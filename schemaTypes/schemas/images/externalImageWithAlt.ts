import { defineType } from "sanity";
import externalImage from "./externalImage";
import alternativeText from "./alternativeText";

export default defineType({
  title: "External Image with alternative text",
  name: "externalImageWithAlt",
  type: "object",
  fields: [externalImage, alternativeText],
});
