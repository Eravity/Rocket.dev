import { MyPortableText } from '../../sanity/schemaTypes/blockContentType'
import type { PortableTextBlock } from '@portabletext/types'

interface ContentDisplayProps {
  data: {
    content: PortableTextBlock | PortableTextBlock[]; 
  };
}

export default function ContentDisplay({ data }: ContentDisplayProps) {
  return (
    <div className="content-container">
      <MyPortableText value={data.content} />
    </div>
  )
}