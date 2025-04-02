import ChapterContent from "@/app/_components/ChapterContent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-117px)] overflow-hidden">
      <main className="flex-1 overflow-y-auto h-full">
        <div className="min-h-[200vh]">
          {children}
        </div>
      </main>
      <ChapterContent className="h-full w-1/4 max-w-[500px] flex-shrink-0 overflow-y-auto"/>
    </div>
  );
}
