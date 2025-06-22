import InfoSign from "./InfoSign";

export default function SectionTitle({title, description, info}: { title: string; description: string, info: string }) {
  return (
    <div className="">
      <div className="flex items-center gap-2">
        <h1 className="font-bold text-base sm:text-lg transition-colors duration-200">
          {title}
        </h1>
        <InfoSign info={info}/>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
