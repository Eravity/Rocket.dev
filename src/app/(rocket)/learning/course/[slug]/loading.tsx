export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg mb-12"></div>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
        <div className="w-full lg:w-9/12">
          <div className="w-full h-24 bg-gray-200 animate-pulse rounded-lg mb-8"></div>
          <div className="w-full h-40 bg-gray-200 animate-pulse rounded-lg mb-8"></div>
          <div className="w-full h-80 bg-gray-200 animate-pulse rounded-lg"></div>
        </div>
        <div className="w-full lg:w-3/12">
          <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
