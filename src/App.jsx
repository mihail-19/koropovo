import b1 from "/b1.jpg";
import b2 from "/b2.jpg";
import b3 from "/b1.jpg";
import b4 from "/b2.jpg";
import "./App.css";
import Content from "./Content";
import Header from "./Headr";
import ScrollBackground from "./ScollBackground";
import { useEffect } from "react";
import useViewport from "./useViewport";
const slides = [
  { image: b1, zoom: 1.07 },
  { image: b2, zoom: 1.05 },
  { image: b3, zoom: 1.02 },
  { image: b4, zoom: 1.02 },
];

export default function App() {
 useViewport()
  return (
    <>
      <ScrollBackground slides={slides} />
      <Header />
      <Content />
    </>
  );
}