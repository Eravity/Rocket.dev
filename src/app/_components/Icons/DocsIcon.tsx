export default function DocsIcon({width = 15, height = 15}: {width?: number, height?: number}) {
  return (
    <div 
      style={{ width: `${width}px`, height: `${height}px` }}
      className={`flex items-center justify-center ${height > 20 ? 'p-[6px] rounded-lg' : 'p-[3px]'} rounded bg-volcanicBurst`}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
          stroke="#fff"
          strokeWidth="1.5"
        />
        <path
          d="M8 12H16"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 8H16"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 16H13"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
