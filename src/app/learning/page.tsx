import { groq } from "next-sanity";
import { createClient } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { TypedObject } from "sanity";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2023-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

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

// Updated query to fetch all posts with necessary fields
const postsQuery = groq`*[_type == "post"]{
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  body // Include body field in the query
}`;

export default async function Page() {
  const builder = imageUrlBuilder(client);
  const posts = await client.fetch<Post[]>(postsQuery);

  const urlFor = (source: string | { asset: { _ref: string } }) =>
    builder.image(source);

  if (!posts || posts.length === 0) {
    return <div>No courses found</div>;
  }

  return (
    <main className="p-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Learning Resources</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: Post) => (
          <article key={post._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            {post.mainImage && (
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={urlFor(post.mainImage).width(800).url()}
                  alt={post.title}
                  width={800}
                  height={Math.round((800 * 9) / 16)}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  style={{ height: 'auto' }}
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                <Link href={`/learning/${post.slug.current}`} className="hover:text-blue-600 transition-colors">
                  {post.title}
                </Link>
              </h2>
              {post.excerpt && (
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                  {post.excerpt}
                </p>
              )}
              <Link 
                href={`/learning/${post.slug.current}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Read more 
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
