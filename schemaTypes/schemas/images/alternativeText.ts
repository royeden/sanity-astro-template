import { defineField } from "sanity";

export default defineField({
  name: "alternativeText",
  type: "text",
  title: "Alternative text",
  description: `Some of your visitors cannot see images, 
        be they blind, color-blind, low-sighted; 
        alternative text is of great help for those 
        people that can rely on it to have a good idea of 
        what\'s on your page.`,
  validation: (Rule) => Rule.required().error("Alternative text is required!"),
});
