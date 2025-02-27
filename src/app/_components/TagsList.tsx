interface TagsListProps {
  tags: string[];
}

export default function TagsList({ tags }: TagsListProps) {
  if (!tags.length) return null;
  
  return (
    <ul className="flex flex-wrap gap-2 my-8">
      {tags.map((tag: string) => (
        <li key={tag} className="text-neutral-700 text-sm">
          <span className="px-2 py-0.5 flex items-center bg-neutral-200 rounded-full">
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}
