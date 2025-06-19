import { defineType } from "sanity";
import { toHTML } from "@portabletext/to-html";
import alignment from "./alignment";

export default defineType({
  name: "alignedBlock",
  title: "Aligned Block",
  type: "object",
  options: {
    collapsed: false,
    collapsible: false,
  },
  fields: [
    {
      name: "content",
      type: "blockContent",
      title: "Content",
      validation: (Rule) => Rule.required().error("Text is required!"),
    },
    alignment,
  ],
  preview: {
    select: {
      alignment: "alignment",
      content: "content",
    },
    prepare({ alignment, content }) {
      return {
        title: alignment
          ? (alignment as string).slice(0, 1).toUpperCase() +
            (alignment as string).slice(1)
          : "Not aligned yet!",
        subtitle: toHTML(content, {
          components: {
            block: ({ children }) => `${children ?? ""}\n`,
            hardBreak: () => "\n",
            list: ({ children }) => `[${children ?? ""}]\n`,
            listItem: ({ children, value: { listItem } }) =>
              `\n${listItem === "bullet" ? "•" : "°"} ${children ?? ""} `,
            marks: {
              strong: ({ children }) => children,
              em: ({ children }) => children,
            },
            types: {
              image: ({ value }) => `[Image: ${value.alt}]`,
            },
            unknownBlockStyle: () => "",
            unknownList: () => "",
            unknownListItem: () => "",
            unknownMark: () => "",
            unknownType: () => "",
          },
        }),
      };
    },
  },
});
