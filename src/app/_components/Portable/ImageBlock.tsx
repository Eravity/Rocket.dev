import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

export default function ImageBlock({ value }: { value: { asset: { _ref: string } }}) {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: "2023-01-01",
    useCdn: process.env.NODE_ENV === "production",
  });

  const builder = imageUrlBuilder(client);
  const urlFor = (source: string | { asset: { _ref: string } }) => builder.image(source);

  return (
    <Image
      src={urlFor(value).width(800).url()}
      alt="Post Image"
      width={800}
      height={Math.round((800 * 9) / 16)} // Assuming 16:9 aspect ratio
      // style={{ width: '100%', height: 'auto', maxWidth: '800px' }}
    />
  );
}
