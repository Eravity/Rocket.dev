import Image from "next/image";
import Link from "next/link";

type PostHeaderProps = {
  title: string;
  imageUrl?: string;
};

export default function PostHeader({ title, imageUrl }: PostHeaderProps) {
  return (
    <header>
      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/learning"
            className="inline-flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span>Back to resources</span>
          </Link>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          {title}
        </h1>
        {imageUrl && (
          <div className="rounded-xl overflow-hidden shadow-lg">
            <Image
              src={imageUrl}
              alt={title}
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />
          </div>
        )}
      </div>
    </header>
  );
}
