"use client";

import { ReactNode } from "react";

interface EqualHeightWrapperProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper component to ensure child components have equal heights
 * Use this to wrap Stats and Roadmap components when they are side by side
 * 
 * Note: The Stats and Roadmap components now have built-in height matching,
 * so this wrapper is optional. Use it only if you need additional styling.
 */
export default function EqualHeightWrapper({ children, className = "" }: EqualHeightWrapperProps) {
  return (
    <div className={`h-full w-full ${className}`}>
      {children}
    </div>
  );
}
