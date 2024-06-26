import { useEffect, useState } from "react";

const useDebounce = (value: any, delay: number) => {
  const [debounceValue, setDebounceValue] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
