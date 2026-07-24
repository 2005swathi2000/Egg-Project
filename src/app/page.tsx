"use client";

import React from "react";
import Container916 from "../components/9-16-container";
import AdManager from "../components/ad-manager";
import { useAppStore } from "../context/store";

// Lazy load screen components to keep load performance high
import Screen1 from "../components/screens/screen-1";
import Screen2 from "../components/screens/screen-2";
import Screen3 from "../components/screens/screen-3";
import Screen4 from "../components/screens/screen-4";
import Screen5 from "../components/screens/screen-5";
import Screen6 from "../components/screens/screen-6";
import Screen7 from "../components/screens/screen-7";

export default function Home() {
  const currentScreen = useAppStore((state) => state.currentScreen);

  // Screen router logic
  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 1:
        return <Screen1 />;
      case 2:
        return <Screen2 />;
      case 3:
        return <Screen3 />;
      case 4:
        return <Screen4 />;
      case 5:
        return <Screen5 />;
      case 6:
        return <Screen6 />;
      case 7:
        return <Screen7 />;
      default:
        return <Screen1 />;
    }
  };

  return (
    <Container916>
      {/* Fullscreen Ads Loop overlay */}
      <AdManager />

      {/* Primary view area */}
      <div className="flex-1 flex flex-col relative w-full h-full">
        {renderActiveScreen()}
      </div>
    </Container916>
  );
}
