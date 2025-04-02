import ChapterContent from "@/app/_components/ChapterContent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-117px)] overflow-hidden">
      <main className="w-full overflow-y-auto flex justify-end h-full">
        <div className="min-h-[200vh] w-4/5 bg-slate-400">
          {children}
        </div>
      </main>
      <ChapterContent className="h-full w-1/4 max-w-[500px] bg-neutral-200 flex-shrink-0 overflow-y-auto"/>
    </div>
  );
}
