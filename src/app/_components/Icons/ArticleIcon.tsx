interface ArticleIconProps {
  fill?: string;
  stroke?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function ArticleIcon({ 
  fill = "#fbbf24", 
  stroke = fill,
  width = 40,
  height = 40,
  className = ""
}: ArticleIconProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height} 
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          fill={fill}
          stroke={stroke}
          strokeWidth="0.7"
          d="M12.966 17.262a.878.878 0 000 1.755h13.518a.878.878 0 000-1.755H12.966z"
        />
        <path
          fill={fill}
          stroke={stroke} 
          strokeWidth="0.7"
          d="M9.411 35c-.411 0-.759-.342-.759-.746V5.758c0-.418.34-.758.759-.758h14.704c.2 0 .395.084.547.236l6.449 6.461c.15.13.236.324.236.534v22.022c0 .404-.349.746-.759.746H9.411zm.759-1.504h19.672V12.989h-5.727a.758.758 0 01-.758-.757V6.504H10.17v26.992zm14.705-22.011h3.9l-3.9-3.915v3.915z"
        />
        <path
          fill={fill}
          stroke={stroke}
          strokeWidth="0.7" 
          d="M12.966 21.164a.878.878 0 000 1.756h13.518a.878.878 0 000-1.756H12.966zM12.966 25.065a.878.878 0 000 1.755h13.518a.878.878 0 000-1.755H12.966z"
        />
      </g>
    </svg>
  );
}


