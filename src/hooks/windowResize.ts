import { useLayoutEffect, useState } from "react";

export const useWindowSize = () => {
  const [size, setSize] = useState({ windowHeight: 0, windowWidth: 0 });

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize({ windowHeight: window.innerHeight, windowWidth: window.innerWidth });
    };

    window.addEventListener("resize", updateSize, true);

    updateSize();

    return () => window.removeEventListener("resize", updateSize, true);
  }, []);

  return size;
};
