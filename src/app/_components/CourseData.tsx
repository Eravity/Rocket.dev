export default function CourseData({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="w-full h-fit flex p-4 border rounded-xl">
      <div className="p-2 rounded-full w-14 h-14 flex items-center justify-center mr-3 bg-neutral-300">
        {icon}
      </div>
      <div>
        <h1 className="text-3xl font-bold">{value}</h1>
        <p className="text-md font-semibold text-neutral-500">{label}</p>
      </div>
    </div>
  );
}
