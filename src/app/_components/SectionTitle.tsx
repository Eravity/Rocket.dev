import InfoSign from "./InfoSign";

export default function SectionTitle({title, info}: {title: string; info: string}) {
  return (
    <div className="flex items-center gap-2">
      <h1 className="font-bold text-base sm:text-lg transition-colors duration-200">
        {title}
      </h1>
      <InfoSign info={info} />
    </div>
  );
}
