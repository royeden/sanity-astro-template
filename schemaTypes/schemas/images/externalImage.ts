import { defineField } from "sanity";

// TODO maybe use an object field to alter the preview?
export default defineField({
  name: "externalImage",
  title: "External Image",
  type: "url",
  validation: (Rule) =>
    Rule.required().error("A source for the external image is required!"),
});
