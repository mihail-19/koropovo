import { useEffect, useRef } from "react";
import './App.css'
import ScrolBackground from "./ScollBackground";
const images = ["/b1.jpg", "/b2.jpg", "/b1.jpg"]
export default function App() {
  
  return (
     <>
      <ScrolBackground />

       
        <header className="hdr">
          <div className="hdr__logo">KOROPOVO</div>

          <div className="hdr__menu">
            <div className="hdr__button">Зарезервувати</div>
            <div>Меню</div>
          </div>
        </header>

       
    </>
  );
}