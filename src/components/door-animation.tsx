"use client";

import React, { useState, useEffect } from "react";
import { useAppStore } from "../context/store";
import { useNavigation } from "../hooks/useNavigation";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function DoorAnimation() {
  const { doorStatus, setDoorStatus } = useAppStore();
  const { navigateToHome } = useNavigation();

  const [openProgress, setOpenProgress] = useState(0);
  const [closeProgress, setCloseProgress] = useState(0);

  useEffect(() => {
    if (doorStatus === "opening") {
      let current = 0;
      const duration = 1200; // 1.2 seconds Snappy open
      const step = 30;
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
      const duration = 1200; // 1.2 seconds Snappy close
      const step = 30;
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

  // 3D Rotation angles based on progress state
  const openRotateY = -105 * (openProgress / 100);
  const closeRotateY = -105 * (1 - closeProgress / 100);

  return (
    <div className="flex flex-col gap-6 w-full px-6 py-4 select-none">
      
      {/* Open Door Card */}
      <button
        onClick={handleOpenDoor}
        disabled={doorStatus !== "closed"}
        className={`flex items-center gap-6 p-5 rounded-3xl bg-white border border-zinc-100 text-left transition select-none ${
          doorStatus === "closed" 
            ? "shadow-lg cursor-pointer hover:border-orange-200 active:scale-[0.98]" 
            : "shadow-sm opacity-90 cursor-default"
        }`}
      >
        {/* Left Side: 3D Door Perspective Scene */}
        <div 
          className="relative w-20 h-20 bg-zinc-50 border border-zinc-200/50 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ perspective: "150px" }}
        >
          <div className="relative w-11 h-14 border-2 border-zinc-300 bg-zinc-100 rounded flex items-center justify-center overflow-hidden">
            {/* Shelf backdrop with dynamic egg */}
            <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center">
              <span className="text-lg select-none filter drop-shadow">🥚</span>
            </div>

            {/* Swing door leaf */}
            <motion.div
              style={{ transformOrigin: "left center" }}
              animate={{ 
                rotateY: doorStatus === "closed" 
                  ? 0 
                  : doorStatus === "opening" 
                    ? openRotateY 
                    : -105 
              }}
              transition={{ ease: "linear", duration: 0 }}
              className="absolute inset-0 bg-[#F97316] border border-orange-600 flex items-center justify-end pr-1 shadow-md"
            >
              {/* Handle knob */}
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full border border-amber-600 shadow" />
            </motion.div>
          </div>
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
            ? "shadow-lg cursor-pointer hover:border-orange-200 active:scale-[0.98]"
            : "shadow-sm opacity-50 cursor-default"
        }`}
      >
        {/* Left Side: 3D Door Perspective Scene */}
        <div 
          className="relative w-20 h-20 bg-zinc-50 border border-zinc-200/50 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ perspective: "150px" }}
        >
          <div className="relative w-11 h-14 border-2 border-zinc-300 bg-zinc-100 rounded flex items-center justify-center overflow-hidden">
            {/* Shelf backdrop with dynamic egg */}
            <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center">
              <span className="text-lg select-none filter drop-shadow">🥚</span>
            </div>

            {/* Swing door leaf */}
            <motion.div
              style={{ transformOrigin: "left center" }}
              animate={{ 
                rotateY: doorStatus === "closed"
                  ? 0
                  : doorStatus === "open"
                    ? -105
                    : doorStatus === "closing"
                      ? closeRotateY
                      : 0
              }}
              transition={{ ease: "linear", duration: 0 }}
              className="absolute inset-0 bg-[#F97316] border border-orange-600 flex items-center justify-end pr-1 shadow-md"
            >
              {/* Handle knob */}
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full border border-amber-600 shadow" />
            </motion.div>
          </div>
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
            className="w-full py-3.5 rounded-full bg-orange-500 text-white font-extrabold hover:bg-orange-600 transition shadow-md active:scale-[0.98] cursor-pointer"
          >
            Return Home
          </button>
        </div>
      )}
    </div>
  );
}
