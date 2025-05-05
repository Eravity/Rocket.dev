import ChapterContent from "@/app/_components/ChapterContent";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
  params: { slug: string; articleId: string };
}) {
  return (
    <div className="relative w-full h-[calc(100vh-117px)] overflow-hidden">
      <main className="overflow-y-auto w-3/4 h-full flex justify-center">
        <div className="max-w-[1000px]">{children}</div>
      </main>
      <aside className="absolute top-0 right-0 w-1/4 max-w-[500px] h-full overflow-y-auto">
        <ChapterContent className="w-full h-full border-l" />
      </aside>
    </div>
  );
}
