export default function InfoSign({ info }: { info: string }) {
  return (
    <div className="relative group">
      <div
        className="inline-flex items-center justify-center w-4 h-4 rounded-full text-black text-sm font-semibold cursor-help border-black border-[2px]"
        role="button"
        aria-label="Information"
      >
        i
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-white text-sm rounded-lg shadow-lg">
        {info}
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-gray-800 rotate-45"></div>
      </div>
    </div>
  );
}
