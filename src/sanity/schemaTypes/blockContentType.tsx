import { defineType, defineArrayMember } from "sanity";
import { ImageIcon } from "@sanity/icons";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import React from "react";
import { TypedObject } from "@portabletext/types";

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export const blockContentType = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      // Styles let you define what blocks can be marked up as. The default
      // set corresponds with HTML tags, but you can set any title or value
      // you want, and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],

      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    }),
    // Image type
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    // Quote type
    defineArrayMember({
      name: "quote",
      type: "object",
      title: "Quote",
      fields: [
        {
          name: "text",
          type: "text",
          title: "Quote Text",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "attribution",
          type: "string",
          title: "Attribution",
        },
        {
          name: "source",
          type: "string",
          title: "Source",
        },
      ],
      preview: {
        select: {
          title: "text",
          subtitle: "attribution",
        },
      },
    }),
  ],
});

interface BlockProps {
  children?: React.ReactNode;
}

const components = {
  block: {
    h1: ({ children }: BlockProps) => (
      <h1 className="text-3xl font-bold my-4">{children}</h1>
    ),
    h2: ({ children }: BlockProps) => (
      <h2 className="text-2xl font-bold my-3">{children}</h2>
    ),
    h3: ({ children }: BlockProps) => (
      <h3 className="text-xl font-semibold my-3">{children}</h3>
    ),
    h4: ({ children }: BlockProps) => (
      <h4 className="text-lg font-semibold my-2">{children}</h4>
    ),
    blockquote: ({ children }: BlockProps) => (
      <div className="my-10 mx-4 md:mx-10">
        <div 
          className="relative px-8 py-5 rounded-lg border"
          style={{ 
            backgroundColor: '#fafafa',
            padding: '1rem',
          }}
        >
          <div className="relative z-10">
            <blockquote className="text-lg md:text-xl italic font-normal text-gray-800 leading-relaxed pl-4">
              {children}
            </blockquote>
          </div>
          
        </div>
      </div>
    ),
    normal: ({ children }: BlockProps) => <p className="my-2">{children}</p>,
  },
  marks: {
    strong: ({ children }: BlockProps) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: BlockProps) => <em className="italic">{children}</em>,
    link: ({
      value,
      children,
    }: {
      value?: { href?: string };
      children?: React.ReactNode;
    }) => {
      const href = value?.href;
      if (!href) return <>{children}</>;
      return (
        <a href={href} className="text-blue-500 hover:underline">
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }: BlockProps) => (
      <ul className="list-disc pl-5 my-4">{children}</ul>
    ),
  },
  types: {
    image: ({
      value,
    }: {
      value: { asset?: { _ref: string }; alt?: string };
    }) => {
      if (!value?.asset?._ref) {
        return null;
      }

      // Convert Sanity reference to actual URL
      const ref = value.asset._ref;
      const [, id, dimensions, format] = ref.split("-");
      const imageUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}-${dimensions}.${format}`;

      return (
        <figure className="my-8 w-full">
          <div className="relative w-full aspect-video">
            <Image
              src={imageUrl}
              alt={value.alt || ""}
              className="rounded-xl shadow-md mx-auto"
              loading="lazy"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          {value.alt && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

interface PortableTextProps {
  value: TypedObject | TypedObject[];
}

export function MyPortableText({ value }: PortableTextProps) {
  return <PortableText value={value} components={components} />;
}
