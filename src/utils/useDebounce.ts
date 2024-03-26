import { useState } from "react";

export const useDebounce = (func: (...args: any[]) => void, delay = 100) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const debouncedFunction = (...args: any[]) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);
    if (timer) clearTimeout(timer);
    setTimer(newTimer);
  };

  return debouncedFunction;
};
