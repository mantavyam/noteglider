
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Beam {
  path: string;
  gradientConfig: {
    initial: {
      x1: string;
      x2: string;
      y1: string;
      y2: string;
    };
    animate: {
      x1: string | string[];
      x2: string | string[];
      y1: string | string[];
      y2: string | string[];
    };
    transition: {
      duration: number;
      repeat: number;
      repeatType: "loop" | "reverse" | "mirror";
      ease: string;
      repeatDelay: number;
      delay: number;
    };
  };
  connectionPoints?: Array<{
    cx: number;
    cy: number;
    r: number;
  }>;
}

interface PulseBeamsProps {
  beams: Beam[];
  gradientColors?: {
    start: string;
    middle: string;
    end: string;
  };
  className?: string;
  children?: ReactNode;
  beamClassName?: string;
  containerClassName?: string;
  svgClassName?: string;
  backgroundElement?: ReactNode;
}

export const PulseBeams = ({
  beams,
  gradientColors = {
    start: "#18CCFC",
    middle: "#6344F5",
    end: "#AE48FF",
  },
  className,
  beamClassName,
  containerClassName,
  svgClassName,
  children,
  backgroundElement,
}: PulseBeamsProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden h-screen w-full relative flex flex-col items-center justify-center isolate",
        className
      )}
    >
      {backgroundElement}

      <div
        className={cn(
          "flex flex-col items-center justify-center relative w-full h-full",
          containerClassName
        )}
      >
        {children}

        <svg
          className={cn(
            "absolute inset-0 z-0 h-full w-full",
            svgClassName
          )}
          viewBox="0 0 855 471"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {beams.map((beam, idx) => (
              <motion.linearGradient
                key={`gradient-${idx}`}
                id={`gradient-${idx}`}
                initial={beam.gradientConfig.initial}
                animate={beam.gradientConfig.animate}
                transition={beam.gradientConfig.transition}
              >
                <stop stopColor={gradientColors.start} stopOpacity="0" />
                <stop
                  offset="0.1"
                  stopColor={gradientColors.start}
                  stopOpacity="0.3"
                />
                <stop
                  offset="0.2"
                  stopColor={gradientColors.middle}
                  stopOpacity="0.5"
                />
                <stop
                  offset="0.5"
                  stopColor={gradientColors.end}
                  stopOpacity="1"
                />
                <stop
                  offset="0.8"
                  stopColor={gradientColors.middle}
                  stopOpacity="0.5"
                />
                <stop
                  offset="0.9"
                  stopColor={gradientColors.start}
                  stopOpacity="0.3"
                />
                <stop offset="1" stopColor={gradientColors.start} stopOpacity="0" />
              </motion.linearGradient>
            ))}
          </defs>
          {beams.map((beam, idx) => (
            <g key={`beam-${idx}`}>
              <path
                stroke={`url(#gradient-${idx})`}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d={beam.path}
                className={cn(
                  "origin-center transition-all duration-300",
                  beamClassName
                )}
              />
              {beam.connectionPoints?.map((point, pointIdx) => (
                <circle
                  key={`connection-point-${idx}-${pointIdx}`}
                  cx={point.cx}
                  cy={point.cy}
                  r={point.r}
                  fill="currentColor"
                  className="text-white"
                />
              ))}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};
