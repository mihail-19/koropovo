import { useEffect } from "react";

export default function useViewport() {
  useEffect(() => {
  const setVH = () => {
    const vh = window.visualViewport?.height || window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${vh * 0.01}px`);
  };

    setVH();

    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", setVH);
    }

    return () => {
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);

      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", setVH);
      }
    };
  }, []);
}