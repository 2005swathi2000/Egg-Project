"use client";

import React, { useState, useEffect } from "react";
import { useAppStore } from "../context/store";
import { useNavigation } from "../hooks/useNavigation";
import { CheckCircle2 } from "lucide-react";

export default function DoorAnimation() {
  const { doorStatus, setDoorStatus } = useAppStore();
  const { navigateToHome } = useNavigation();

  const [openProgress, setOpenProgress] = useState(0);
  const [closeProgress, setCloseProgress] = useState(0);

  useEffect(() => {
    if (doorStatus === "opening") {
      let current = 0;
      const duration = 2500; // 2.5 seconds
      const step = 50;
      const interval = setInterval(() => {
        current += step;
        const nextProgress = Math.min((current / duration) * 100, 100);
        setOpenProgress(nextProgress);
        if (current >= duration) {
          clearInterval(interval);
          setDoorStatus("open");
        }
      }, step);
      return () => clearInterval(interval);
    }
  }, [doorStatus]);

  useEffect(() => {
    if (doorStatus === "closing") {
      let current = 0;
      const duration = 2500; // 2.5 seconds
      const step = 50;
      const interval = setInterval(() => {
        current += step;
        const nextProgress = Math.min((current / duration) * 100, 100);
        setCloseProgress(nextProgress);
        if (current >= duration) {
          clearInterval(interval);
          setDoorStatus("closed-success");
        }
      }, step);
      return () => clearInterval(interval);
    }
  }, [doorStatus]);

  const handleOpenDoor = () => {
    if (doorStatus === "closed") {
      setDoorStatus("opening");
    }
  };

  const handleCloseDoor = () => {
    if (doorStatus === "open") {
      setDoorStatus("closing");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full px-6 py-4 select-none">
      {/* Open Door Card */}
      <button
        onClick={handleOpenDoor}
        disabled={doorStatus !== "closed"}
        className={`flex items-center gap-6 p-5 rounded-3xl bg-white border border-zinc-100 text-left transition select-none ${
          doorStatus === "closed" 
            ? "shadow-lg cursor-pointer hover:border-amber-200 active:scale-[0.98]" 
            : "shadow-sm opacity-90 cursor-default"
        }`}
      >
        {/* Left Side: Square Indicator */}
        <div className="relative w-20 h-20 bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0">
          {/* Progress fill */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-amber-500 transition-all duration-75"
            style={{ height: `${openProgress}%` }}
          />
          {/* Visual inner icon or label */}
          <span className="relative z-10 font-bold text-xs uppercase text-zinc-600 select-none">
            {doorStatus === "closed" ? "Ready" : doorStatus === "opening" ? `${Math.round(openProgress)}%` : "Opened"}
          </span>
        </div>
        
        {/* Right Side: Text description */}
        <div className="flex flex-col gap-1 select-none">
          <span className="font-extrabold text-xl text-zinc-900 leading-tight">Open Door</span>
          <span className="text-sm font-medium text-zinc-500">Pull the Door to Open</span>
        </div>
      </button>

      {/* Close Door Card */}
      <button
        onClick={handleCloseDoor}
        disabled={doorStatus !== "open"}
        className={`flex items-center gap-6 p-5 rounded-3xl bg-white border border-zinc-100 text-left transition select-none ${
          doorStatus === "open"
            ? "shadow-lg cursor-pointer hover:border-amber-200 active:scale-[0.98]"
            : "shadow-sm opacity-50 cursor-default"
        }`}
      >
        {/* Left Side: Square Indicator */}
        <div className="relative w-20 h-20 bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0">
          {/* Progress fill */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-amber-600 transition-all duration-75"
            style={{ height: `${closeProgress}%` }}
          />
          {/* Visual inner label */}
          <span className="relative z-10 font-bold text-xs uppercase text-zinc-600 select-none">
            {doorStatus === "open" ? "Ready" : doorStatus === "closing" ? `${Math.round(closeProgress)}%` : doorStatus === "closed-success" ? "Closed" : "Locked"}
          </span>
        </div>
        
        {/* Right Side: Text description */}
        <div className="flex flex-col gap-1 select-none">
          <span className="font-extrabold text-xl text-zinc-900 leading-tight">Close Door</span>
          <span className="text-sm font-medium text-zinc-500">Push the Door Firmly to Close</span>
        </div>
      </button>

      {/* Success Dialog overlay */}
      {doorStatus === "closed-success" && (
        <div className="flex flex-col items-center justify-center text-center gap-4 bg-amber-50/90 border border-amber-200 rounded-3xl p-6 mt-4 shadow-inner">
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          <div>
            <h4 className="font-extrabold text-xl text-amber-950">Door Closed Successfully</h4>
            <p className="text-sm font-medium text-amber-800">Thank you for your purchase!</p>
          </div>
          <button
            onClick={navigateToHome}
            className="w-full py-3.5 rounded-full bg-amber-500 text-white font-extrabold hover:bg-amber-600 transition shadow-md active:scale-[0.98]"
          >
            Return Home
          </button>
        </div>
      )}
    </div>
  );
}
