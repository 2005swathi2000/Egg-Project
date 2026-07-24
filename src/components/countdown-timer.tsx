"use client";

import React, { useEffect, useState } from "react";
import { useAppStore } from "../context/store";

interface CountdownTimerProps {
  onComplete?: () => void;
}

export default function CountdownTimer({ onComplete }: CountdownTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [progress, setProgress] = useState(1); // 1 to 0 for shrinking ring
  const setScreen = useAppStore((state) => state.setScreen);

  useEffect(() => {
    // 5 seconds timer to display 5, 4, 3, 2, 1
    const totalDuration = 5000;
    const intervalTick = 50;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += intervalTick;
      const currentProgress = 1 - elapsed / totalDuration;
      setProgress(Math.max(currentProgress, 0));

      const newSeconds = Math.ceil(5 - elapsed / 1000);
      setSecondsLeft(Math.max(newSeconds, 1));

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        if (onComplete) {
          onComplete();
        } else {
          setScreen(3);
        }
      }
    }, intervalTick);

    return () => clearInterval(interval);
  }, []);

  // SVG parameters
  const size = 110;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center justify-center relative w-[130px] h-[130px] select-none">
      <svg 
        width={size} 
        height={size} 
        className="transform -rotate-90 select-none pointer-events-none"
      >
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        {/* Progress ring circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#F97316" // Orange
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-75"
        />
      </svg>
      {/* Center text representing the seconds remaining */}
      <div className="absolute inset-0 flex items-center justify-center select-none">
        <span className="text-4xl font-extrabold text-amber-900 leading-none">
          {secondsLeft}
        </span>
      </div>
    </div>
  );
}
