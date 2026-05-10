import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: "visibilitychange,DOMContentLoaded"
});

export default function ScrollBackground({ slides }) {
  const ref = useRef(null);
 // 🔥 WOODNEST FIX: фиксируем высоту ОДИН РАЗ
      const baseHeight = window.innerHeight;
  useEffect(() => {
    const ctx = gsap.context(() => {

      const sections = gsap.utils.toArray(".bg-slide");

     

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",

          // ❗ ключевая фиксация — НЕ visualViewport
          end: `+=${slides.length * baseHeight}`,

          scrub: 1,

          // 🔥 важно для mobile stability
          invalidateOnRefresh: false,
          anticipatePin: 1,
        }
      });

      sections.forEach((el, i) => {
        const img = el.querySelector("img");

        // =========================
        // ZOOM
        // =========================
        tl.to(img, {
          scale: slides[i].zoom,
          ease: "none"
        }, i);

        // =========================
        // CROSSFADE
        // =========================
        if (sections[i + 1]) {
          const nextImg = sections[i + 1].querySelector("img");

          tl.to(img, {
            opacity: 0,
            ease: "none"
          }, i + 0.6);

          tl.to(nextImg, {
            opacity: 1,
            ease: "none"
          }, i + 0.6);
        }
      });

    }, ref);

    let isGesture = false;
  let lastVH = window.innerHeight;

  const lockViewport = () => {
    const vh = window.visualViewport?.height || window.innerHeight;

    if (Math.abs(vh - lastVH) > 80) {
      isGesture = true;

      setTimeout(() => {
        isGesture = false;
      }, 250);
    }

    lastVH = vh;
  };

  window.visualViewport?.addEventListener("resize", lockViewport);

  return () => {
    ctx.revert();
    window.visualViewport?.removeEventListener("resize", lockViewport);
  };

}, [slides]);

  return (
    <div ref={ref} className="bg-engine">
      {slides.map((s, i) => (
        <div key={i} className="bg-slide">
          <img src={s.image} alt="" />
        </div>
      ))}
    </div>
  );
}