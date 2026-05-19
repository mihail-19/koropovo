import { useEffect, useState } from "react";
import "./App.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);
export default function Content() {
 useEffect(() => {
  gsap.fromTo(
  ".fade__header",
  {
    opacity: 0,
    y: 40,
  },
  {
    opacity: 1,
    y: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".fade__header",
      start: "top 80%",
      end: "top 40%",
      scrub: true,
    },
  }
);
 gsap.to(".fade__header", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".fade__header",
      start: "center center",
      end: "bottom top",
      scrub: true,
    },
  });
}, []);

  return (
    <main className="content">
      <section className="block">
        <h1 className="fade__header">Відпочинок у Коропово </h1>
        <div className="order">
            <div className="order__section">
                <p>Дата заселення</p>
                <p><a href="/">Додати</a></p>
            </div>
              <div className="order__section">
                <p>Дата виселення</p>
                <p><a href="/">Додати</a></p>
            </div>
              <div className="order__section">
                <p>Кількість гостей</p>
                <p><a href="/">1 гість</a></p>
            </div>

        </div>
      </section>

      <section className="block">
        <h1>Відпочинок на лоні природи</h1>
        <p>Дозволь собі розслабитись!</p>
      </section>

      <section className="block">
        <h1>Затишок і краєвиди</h1>
        <p>у гармонії з природою</p>
      </section>
    </main>
  );
}