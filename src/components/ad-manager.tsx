"use client";

import React, { useEffect, useState, useRef } from "react";
import { useAppStore } from "../context/store";
import { motion, AnimatePresence } from "framer-motion";

// Configuration of advertisements (modular list of video & image ads)
const ADVERTISEMENTS = [
  {
    id: 1,
    type: "image",
    src: "/images/page_1_img_1.png", // Use extracted images as placeholders
    title: "Organic Farm Fresh Eggs",
    subtitle: "Naturally Sourced & Rich in Protein",
  },
  {
    id: 2,
    type: "video",
    src: "/videos/promo.mp4", // Supports actual video path
    title: "Healthy Hens, Quality Eggs",
    subtitle: "Watch how we maintain hygiene standards",
  },
  {
    id: 3,
    type: "image",
    src: "/images/page_3_img_1.png",
    title: "Freshness Guaranteed",
    subtitle: "From our nests to your trays directly",
  }
];

export default function AdManager() {
  const { 
    currentScreen, 
    isAdActive, 
    setAdActive, 
    adIndex, 
    setAdIndex 
  } = useAppStore();

  const [progress, setProgress] = useState(0);
  const [isVideoLoadingError, setIsVideoLoadingError] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeAd = ADVERTISEMENTS[adIndex % ADVERTISEMENTS.length];

  // Starts the advertisement playback
  useEffect(() => {
    if (!isAdActive) {
      // Clean up timers if advertisement is not active
      clearTimers();
      return;
    }

    setProgress(0);
    setIsVideoLoadingError(false);

    let durationMs = 5000; // Default for posters
    
    if (activeAd.type === "video") {
      // Videos play for actual duration up to 15 seconds
      durationMs = 15000;
    }

    // Start progress tracking for visual feed
    const intervalTick = 50;
    let elapsed = 0;
    progressIntervalRef.current = setInterval(() => {
      elapsed += intervalTick;
      setProgress(Math.min((elapsed / durationMs) * 100, 100));
    }, intervalTick);

    // Timeout to finish advertisement
    timerRef.current = setTimeout(() => {
      handleAdComplete();
    }, durationMs);

    return () => {
      clearTimers();
    };
  }, [isAdActive, adIndex]);

  // Idle timer logic on Screen 1
  useEffect(() => {
    // Advertisement rotation only runs while idle on Screen 1
    if (currentScreen !== 1 || isAdActive) {
      return;
    }

    // Wait 6-7 seconds of idle time, then play next ad
    const idleTimeout = setTimeout(() => {
      // Advance to next ad
      setAdIndex(adIndex + 1);
      setAdActive(true);
    }, 6500); // 6.5 seconds

    return () => {
      clearTimeout(idleTimeout);
    };
  }, [currentScreen, isAdActive, adIndex]);

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  const handleAdComplete = () => {
    clearTimers();
    setAdActive(false);
  };

  const handleSkip = () => {
    handleAdComplete();
  };

  const handleVideoLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const videoDuration = e.currentTarget.duration * 1000;
    const playDuration = Math.min(videoDuration, 15000); // Cap at 15s

    clearTimers();
    setProgress(0);

    let elapsed = 0;
    progressIntervalRef.current = setInterval(() => {
      elapsed += 50;
      setProgress(Math.min((elapsed / playDuration) * 100, 100));
    }, 50);

    timerRef.current = setTimeout(() => {
      handleAdComplete();
    }, playDuration);
  };

  if (!isAdActive) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-50 flex flex-col justify-between bg-black text-white"
      >
        {/* Top Header bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-10">
          <span className="text-xs tracking-wider uppercase bg-white/20 px-2 py-1 rounded">Advertisement</span>
          {activeAd.type === "video" && (
            <button 
              onClick={handleSkip}
              className="px-4 py-1.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition active:scale-95"
            >
              Skip
            </button>
          )}
        </div>

        {/* Media Player Container */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-zinc-950">
          {activeAd.type === "video" && !isVideoLoadingError ? (
            <video
              ref={videoRef}
              src={activeAd.src}
              autoPlay
              muted
              playsInline
              onLoadedMetadata={handleVideoLoadedMetadata}
              onError={() => setIsVideoLoadingError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            // Image Poster or Fallback simulated video player
            <div className="relative w-full h-full">
              {/* Poster Image */}
              <img 
                src={activeAd.src} 
                alt={activeAd.title}
                className="w-full h-full object-cover opacity-80"
              />
              
              {/* Visual simulated player layout for videos that fail to load */}
              {activeAd.type === "video" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                  <div className="w-16 h-16 rounded-full border-4 border-white border-t-transparent animate-spin mb-4" />
                  <p className="text-sm font-semibold tracking-wide">Playing Promo Video...</p>
                </div>
              )}
            </div>
          )}

          {/* Ad Details overlay */}
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-1">
            <h3 className="font-bold text-lg text-amber-500">{activeAd.title}</h3>
            <p className="text-sm text-zinc-300">{activeAd.subtitle}</p>
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="h-1.5 bg-zinc-800 w-full relative">
          <div 
            className="h-full bg-amber-500 transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
