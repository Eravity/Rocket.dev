const InfoCell = ({
  label,
  value,
  icon,
  isUrgent,
}: {
  label: string;
  value: string | number | React.ReactNode;
  icon?: React.ReactNode;
  isUrgent?: boolean;
}) => (
  <div className="flex items-start justify-center flex-col p-2 space-y-2">
    <h2 className="w-full flex items-center text-neutral-500 font-semibold text-xs sm:text-sm">
      {label}
    </h2>
    <h2
      className={`w-full flex gap-1 items-center font-semibold text-xs sm:text-sm ${
        isUrgent ? "text-red-500" : ""
      }`}
    >
      {icon}
      {value}
    </h2>
  </div>
);

export default InfoCell;