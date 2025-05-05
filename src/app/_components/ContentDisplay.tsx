import { MyPortableText } from '../../sanity/schemaTypes/blockContentType'
import type { PortableTextBlock } from '@portabletext/types'

interface ContentDisplayProps {
  data: {
    content: PortableTextBlock | PortableTextBlock[]; 
  };
}

export default function ContentDisplay({ data }: ContentDisplayProps) {
  return (
    <div className="container max-w-4xl mx-auto text-justify prose prose-slate prose-a:text-blue-600 prose-img:rounded-lg prose-img:shadow-md">
      <MyPortableText value={data.content} />
    </div>
  )
}