import { defineField, defineType } from "sanity";

export default defineType({
  name: "meta",
  title: "Meta information",
  type: "object",
  options: {
    collapsible: true,
  },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "metaImage",
      title: "Meta Image",
      type: "image",
    }),
  ],
});
