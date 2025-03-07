export default function Clock({
  color,
  width = 20,
  height = 20,
  stroke = 2
}: {
  color?: string;
  width?: number;
  height?: number;
  stroke?: number;
}) {
  return (
    <div>
      <svg
        width={`${width}px`}
        height={`${height}px`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          stroke={color || "#737373"}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
