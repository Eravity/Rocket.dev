import { PortableText } from "@portabletext/react";
import components from "@/app/_components/Portable/index.ts";
import type { PortableTextBlock } from "@portabletext/types";

type PostContentProps = {
  content: PortableTextBlock[];
};

export default function PostContent({ content }: PostContentProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="space-y-6 text-lg text-gray-700">
        <PortableText
          value={content}
          components={{
            ...components,
            block: {
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
                  {children}
                </h1>
              ),
              normal: ({ children }) => (
                <p className="leading-relaxed">{children}</p>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                  {children}
                </h3>
              ),
            },
            list: {
              bullet: ({ children }) => (
                <ul className="list-disc pl-6 my-6 space-y-2">{children}</ul>
              ),
              number: ({ children }) => (
                <ol className="list-decimal pl-6 my-6 space-y-2">{children}</ol>
              ),
            },
          }}
        />
      </div>
    </div>
  );
}
