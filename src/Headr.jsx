import { useState } from "react";
import "./App.css";
import menuIcon from "/menu.png"
export default function Header() {
  const [showMenu, setShowMenu] = useState(false)


  return (
    <header className="hdr">
      <div>KOROPOVO</div>
      <div className={`header__menu-icon-container ${showMenu ? "active" : ""}`} onClick={() => setShowMenu(!showMenu)}>
            <div className="icon-face front"></div>
            <div className="icon-face back"></div>
    </div>
     
        <div className={ showMenu ? "header__menu-body_active" : "header__menu-body"}>

          

        </div>
      
      
           
    </header>
  );
}