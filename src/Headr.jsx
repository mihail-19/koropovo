import { useState } from "react";
import "./App.css";
import menuIcon from "/menu.png"
export default function Header() {
  const [showMenu, setShowMenu] = useState(false)


  return (
    <header className="hdr">
      <div>KOROPOVO</div>
      <div className="header__menu-icon" onClick={() => setShowMenu(true)}></div>
      {showMenu && (
        <div className="header__menu-body">

          <div className="header__menu-top">
            <div className="header__menu-close" onClick={() => setShowMenu(false)}></div>
          </div>

        </div>
      )}
      
           
    </header>
  );
}