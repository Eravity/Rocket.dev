import { groq } from 'next-sanity'
import { createClient } from 'next-sanity'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client);

export const urlFor = (source: string) => builder.image(source)

const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  body,
  mainImage
}`

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const post = await client.fetch(postQuery, { slug })

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <main style={{ padding: '1rem' }}>
      <Link href="/learning">← Back to posts</Link>
      <article>
        <h1>{post.title}</h1>
        {post.mainImage && (
          <Image
            src={urlFor(post.mainImage).width(800).url()}
            alt={post.title}
            style={{ maxWidth: '100%' }}
          />
        )}
        <div>
          <PortableText value={post.body} />
        </div>
      </article>
    </main>
  )
}