import { useAppStore } from "../context/store";

export const useNavigation = () => {
  const currentScreen = useAppStore((state) => state.currentScreen);
  const setScreen = useAppStore((state) => state.setScreen);
  const isAdActive = useAppStore((state) => state.isAdActive);
  const setAdActive = useAppStore((state) => state.setAdActive);
  const adIndex = useAppStore((state) => state.adIndex);
  const setAdIndex = useAppStore((state) => state.setAdIndex);
  const resetAll = useAppStore((state) => state.resetAll);

  const navigateToHome = () => {
    resetAll();
    setScreen(1);
    setAdActive(true); // Restart the advertisement cycle
  };

  const startPurchaseFlow = () => {
    setAdActive(false);
    setScreen(2);
  };

  return {
    currentScreen,
    setScreen,
    isAdActive,
    setAdActive,
    adIndex,
    setAdIndex,
    navigateToHome,
    startPurchaseFlow,
  };
};
