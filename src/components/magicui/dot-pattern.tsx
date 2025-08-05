"use client";

import { cn } from "@/lib/utils";
import { useId } from "react";
 
interface DotPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  [key: string]: unknown;
}
export function DotPattern({ width = 16, height = 16, x = 0, y = 0, cx = 1, cy = 1, cr = 1, className, ...props }: DotPatternProps) {
  const id = useId();
  const gradientId = `gradient-${id}`;
  const noiseId = `noise-${id}`;
 
  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden">
      {/* Clean solid background */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: '#faf8f3'
        }}
      />
    </div>
  );
}
 
export default DotPattern;