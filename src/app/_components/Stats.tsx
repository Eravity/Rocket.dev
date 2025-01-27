import icons from "./Icons/Icons";

type StatsCardProps = {
  Icon: React.ComponentType;
  value: number;
  label: string;
};

const StatsCard = ({ Icon, value, label }: StatsCardProps) => (
  <div className="flex justify-between h-16 sm:h-16 md:h-12 lg:h-16 border rounded-lg p-1.5 sm:p-2 w-full sm:w-auto">
    <div className="min-w-[32px] sm:min-w-[40px] md:min-w-[48px] lg:min-w-[56px] flex justify-center items-center">
      <div className="w-5 sm:w-6 md:w-7 lg:w-8">
        <Icon />
      </div>
    </div>
    <div className="flex flex-col justify-center flex-1 pl-5 md:pl-2 lg:pl-0">
      <h1 className="font-bold text-lg sm:text-sm md:text-base lg:text-lg">{value}</h1>
      <p className="text-sm sm:text-[9px] md:text-xs lg:text-sm font-semibold text-neutral-500">
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
    <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 w-full max-w-full sm:max-w-full md:max-w-xs lg:max-w-md">
      {statsData.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}
