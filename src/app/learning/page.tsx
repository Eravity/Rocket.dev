import { groq } from "next-sanity";
import { createClient } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { TypedObject } from "sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2023-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

const builder = imageUrlBuilder(client);

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: {
    asset: {
      _ref: string;
    };
  };
  body?: TypedObject | TypedObject[];
};

export const urlFor = (source: string | { asset: { _ref: string } }) => builder.image(source);

// Updated query to fetch all posts with necessary fields
const postsQuery = groq`*[_type == "post"]{
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  body // Include body field in the query
}`;

const components = {
  types: {
    image: ({ value }: { value: { asset: { _ref: string } } }) => (
      <Image
        src={urlFor(value).width(400).url()}
        alt="Post Image"
        width={400}
        height={300}
      />
    ),
  },
};

export default async function Page() {
  const posts = await client.fetch<Post[]>(postsQuery);

  if (!posts || posts.length === 0) {
    return <div>No courses found</div>;
  }

  return (
    <main>
      <h1>Learning Resources</h1>
      <div>
        {posts.map((post: Post) => (
          <article key={post._id}>
            {post.mainImage && (
              <div>
                <Image
                  src={urlFor(post.mainImage).width(400).url()}
                  alt={post.title}
                  width={400}
                  height={300}
                />
              </div>
            )}
            <div>
              <h2>
                <Link href={`/learning/${post.slug.current}`}>
                  {post.title}
                </Link>
              </h2>
              {post.excerpt && (
                <p>{post.excerpt}</p>
              )}
              {post.body && (
                <PortableText value={post.body} components={components} />
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
