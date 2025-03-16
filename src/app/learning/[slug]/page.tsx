import { groq } from "next-sanity";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import PostHeader from "@/app/_components/Post/PostHeader";
import PostContent from "@/app/_components/Post/PostContent";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2023-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: string) => builder.image(source);

const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  body,
  mainImage
}`;

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await client.fetch(postQuery, { slug });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="border-b">
        <PostHeader
          title={post.title}
          imageUrl={
            post.mainImage
              ? urlFor(post.mainImage).width(1200).url()
              : undefined
          }
        />
      </div>
      <PostContent content={post.body} />
    </main>
  );
}
