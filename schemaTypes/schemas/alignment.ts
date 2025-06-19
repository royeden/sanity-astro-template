import { defineField } from "sanity";

export type Alignment = "left" | "right" | "center" | "justified";

type AlignmentOption<T extends Alignment> = {
  title: Capitalize<T>;
  value: T;
};

export default defineField({
  type: "string",
  name: "alignment",
  title: "Text Alignment",
  options: {
    list: [
      {
        title: "Left",
        value: "left",
      },
      {
        title: "Right",
        value: "right",
      },
      {
        title: "Center",
        value: "center",
      },
      {
        title: "Justified",
        value: "justified",
      },
    ] as const satisfies [
      AlignmentOption<"left">,
      AlignmentOption<"right">,
      AlignmentOption<"center">,
      AlignmentOption<"justified">,
    ],
  },
  validation: (Rule) => Rule.required().error("Select an alignment!"),
});
