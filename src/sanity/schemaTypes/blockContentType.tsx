import {defineType, defineArrayMember} from 'sanity'
import {ImageIcon} from '@sanity/icons'
import {PortableText} from '@portabletext/react'
import React from 'react'

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
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      // Styles let you define what blocks can be marked up as. The default
      // set corresponds with HTML tags, but you can set any title or value
      // you want, and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
  ],
})

interface BlockProps {
  children?: React.ReactNode;
}

const components = {
  block: {
    h1: ({children}: BlockProps) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
    h2: ({children}: BlockProps) => <h2 className="text-2xl font-bold my-3">{children}</h2>,
    h3: ({children}: BlockProps) => <h3 className="text-xl font-semibold my-3">{children}</h3>,
    h4: ({children}: BlockProps) => <h4 className="text-lg font-semibold my-2">{children}</h4>,
    blockquote: ({children}: BlockProps) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>,
    normal: ({children}: BlockProps) => <p className="my-2">{children}</p>,
  },
  marks: {
    strong: ({children}: BlockProps) => <strong className="font-bold">{children}</strong>,
    em: ({children}: BlockProps) => <em className="italic">{children}</em>,
    link: ({value, children}: {value?: {href?: string}, children?: React.ReactNode}) => {
      const href = value?.href;
      if (!href) return <>{children}</>;
      return <a href={href} className="text-blue-500 hover:underline">{children}</a>
    },
  },
  list: {
    bullet: ({children}: BlockProps) => <ul className="list-disc pl-5 my-4">{children}</ul>,
  }
}

import {TypedObject} from '@portabletext/types'

interface PortableTextProps {
  value: TypedObject | TypedObject[]; 
}

export function MyPortableText({value}: PortableTextProps) {
  return <PortableText value={value} components={components} />
}

