import { useEffect, useRef } from "react";

const SCROLL_POSITION_KEY = 'scroll-position-36five';

export const useScrollPosition = () => {
  const savedScrollY = useRef<number>(0);

  const saveScrollPosition = () => {
    const currentScrollY = window.scrollY;
    savedScrollY.current = currentScrollY;
    sessionStorage.setItem(SCROLL_POSITION_KEY, currentScrollY.toString());
  };

  const restoreScrollPosition = () => {
    const savedPosition = sessionStorage.getItem(SCROLL_POSITION_KEY);
    if (savedPosition) {
      const scrollY = parseInt(savedPosition, 10);
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
      });
      // Clear the saved position after restoration
      sessionStorage.removeItem(SCROLL_POSITION_KEY);
      return true;
    }
    return false;
  };

  const clearScrollPosition = () => {
    sessionStorage.removeItem(SCROLL_POSITION_KEY);
  };

  return {
    saveScrollPosition,
    restoreScrollPosition,
    clearScrollPosition
  };
};