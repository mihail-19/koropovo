import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);
export default function ScrollBackground({ slides }) {
  const ref = useRef(null);
 
  
  useEffect(() => {
    ScrollTrigger.refresh()
    let isViewportChanging = false;
    let lastVH = window.innerHeight;
    let lockTimer;
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".bg-slide");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          // Фіксуємо кінцеву точку відносно висоти вікна та кількості слайдів
          end: () => `+=${window.innerHeight * (slides.length - 1)}`,
          scrub: 1,
          invalidateOnRefresh: true,
          pin: ".bg-engine",           // КЛЮЧОВЕ: фіксуємо фон
          pinSpacing: true,   // Щоб контент міг наповзати зверху
          invalidateOnRefresh: true,
        }
      });

      sections.forEach((el, i) => {
        const img = el.querySelector("img");

        gsap.set(img, {
          scale: 1,
          opacity: i === 0 ? 1 : 0,
          force3D: true // Примусове використання 3D для мобільних
        });

        // ZOOM
        tl.to(img, {
          scale: slides[i].zoom,
          ease: "none",
          onUpdate: function () {
            if (isViewportChanging) {
              // ❗ откатываем к предыдущему значению
              this.targets().forEach(t => {
                t.style.transform = t._lastTransform || "scale(1)";
              });
              return;
            }

            // сохраняем последнее нормальное состояние
            this.targets().forEach(t => {
              t._lastTransform = t.style.transform;
            });
          }
        }, i);

        // CROSSFADE
        if (sections[i + 1]) {
          const nextImg = sections[i + 1].querySelector("img");
          tl.to(img, { opacity: 0, ease: "power1.inOut" }, i + 0.6);
          tl.to(nextImg, { opacity: 1, ease: "power1.inOut" }, i + 0.6);
        }

           // =========================
    // 📱 VIEWPORT DETECTOR
    // =========================
    const onViewportResize = () => {
      const vh = window.visualViewport?.height || window.innerHeight;

      // 🔥 если скачок большой — это address bar
      if (Math.abs(vh - lastVH) > 80) {
        isViewportChanging = true;

        clearTimeout(lockTimer);
        lockTimer = setTimeout(() => {
          isViewportChanging = false;
        }, 250);
      }

      lastVH = vh;
    };

    window.visualViewport?.addEventListener("resize", onViewportResize);

    return () => {
      ctx.revert();
      window.visualViewport?.removeEventListener("resize", onViewportResize);
    };

      });
    }, ref);

    return () => ctx.revert();
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