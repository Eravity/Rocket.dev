"use client";

import Image from 'next/image';
import { CSSProperties } from 'react';

interface SafeImageProps {
  src: string | null | undefined;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
}

export default function SafeImage({
  src, 
  alt,
  width = 300,
  height = 200,
  className = "",
  style = {},
  priority = false
}: SafeImageProps) {
  if (!src) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height, ...style }}
      >
        <span className="text-gray-500 text-sm">No image</span>
      </div>
    );
  }
  
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      priority={priority}
    />
  );
}
