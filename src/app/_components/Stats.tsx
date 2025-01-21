import icons from "./Icons";

type StatsCardProps = {
  Icon: React.ComponentType;
  value: number;
  label: string;
};

const StatsCard = ({ Icon, value, label }: StatsCardProps) => (
  <div className="flex justify-between h-8 sm:h-10 md:h-12 lg:h-16 border-2 rounded-lg p-1.5 sm:p-2 md:p-3 lg:p-4 w-full sm:w-auto">
    <div className="w-6 sm:w-8 md:w-10 lg:w-1/3 flex justify-center items-center h-full">
      <div className="w-4 sm:w-5 md:w-6 lg:w-auto">
        <Icon />
      </div>
    </div>
    <div className="flex flex-col justify-center h-full flex-1 px-1.5 sm:px-2 lg:px-3">
      <h1 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg">{value}</h1>
      <p className="text-[8px] sm:text-[9px] md:text-xs lg:text-sm font-semibold text-neutral-500">
        {label}
      </p>
    </div>
  </div>
);

export default function Stats() {
  const { Points, Medal, Certificate } = icons;

  const statsData = [
    { Icon: Points, value: 100, label: "Points" },
    { Icon: Medal, value: 32, label: "Badges" },
    { Icon: Certificate, value: 12, label: "Courses" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
      {statsData.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}
