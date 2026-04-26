import { useEffect, useRef } from "react";
import './App.css'
const images = ["/b1.jpg", "/b2.jpg", "/b1.jpg"]
export default function ScrolBackground() {
  const a = useRef(null);
  const b = useRef(null);
  const ticking = useRef(false);

  useEffect(() => {
    const ZOOM_PART = 0.7; // part from zoom to fade 

    const setBg = (el, src) => {
      if (el) el.style.backgroundImage = `url(${src})`;
    };

    const onScroll = () => {
      if (ticking.current) return;

      //reduce lags
      requestAnimationFrame(() => {
        const vh = window.innerHeight;
        const scroll = window.scrollY;

        
        const section = Math.floor(scroll / vh);
        const progress = (scroll % vh) / vh;

        console.log(`vh ${vh}; scroll ${scroll}; section ${section}; progress ${progress.toFixed(3)}`)
        const currentIndex = Math.min(section, images.length - 1);
        const nextIndex = Math.min(section + 1, images.length - 1);

        const layerA = a.current;
        const layerB = b.current;

        if (!layerA || !layerB) return;

        // 📌 ставим изображения
        setBg(layerA, images[currentIndex]);
        setBg(layerB, images[nextIndex]);

        // =========================
        // 1. ZOOM ФАЗА
        // =========================
        if (progress < ZOOM_PART) {
          const t = progress / ZOOM_PART; // 0 → 1

          const zoom = 1 + t * 0.03;

          layerA.style.opacity = 1;
          layerB.style.opacity = 0;

          layerA.style.transform = `scale(${zoom})`;
          layerB.style.transform = `scale(${zoom})`;
        }

        // =========================
        // 2. CROSSFADE ФАЗА
        // =========================
        else {
          const t = (progress - ZOOM_PART) / (1 - ZOOM_PART); // 0 → 1

          const zoom = 1.03; // фиксируем зум

          layerA.style.transform = `scale(${zoom})`;
          layerB.style.transform = `scale(1)`;

          layerA.style.opacity = 1 - t;
          layerB.style.opacity = t;
        }

        ticking.current = false;
      });

      ticking.current = true;
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div ref={a} className="bg-layer" />
      <div ref={b} className="bg-layer" />
      <div className="content">
          <section className="section">
            <h1>Сцена 1</h1>
            <p>Контент</p>
          </section>
          <section className="section">
            <h1>Сцена 2</h1>
            <p>Контент</p>
          </section>
          <section className="section">
            <h1>Сцена 3</h1>
            <p>Контент</p>
          </section>
      </div>
      <div style={{ height: `${images.length * 100}vh` }}/>
    </>
  );
}