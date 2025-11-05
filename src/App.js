import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import "./App.css";
import Dates from "./components/dates/Dates";
import Nav from "./components/nav/Nav";

function App() {
  const [blackBackdrop, setBlackBackdrop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // ! USE EFFECT
  useEffect(() => {
    // Backdrop animation
    const backdropAnimation = () => {
      const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });
      if (blackBackdrop) {
        tl.to(".black-backdrop", { display: "block" }).to(
          ".black-backdrop",
          { opacity: 0.6, duration: 0.2 },
          "<.1"
        );
      } else {
        tl.to(".black-backdrop", { opacity: 0, duration: 0.2 }, "<.1").to(
          ".black-backdrop",
          { display: "none" }
        );
      }
    };
    backdropAnimation();

    return () => {};
  }, [blackBackdrop, isOpen]);

  // Nav toggle
  const toggleNav = () => {
    setIsOpen((prev) => !prev);
    setBlackBackdrop((prev) => !prev);
  };

  return (
    <div className='App default-font'>
      <Dates></Dates>
      <div
        className='black-backdrop'
        onClick={() => isOpen && toggleNav()}
      ></div>
      <Nav toggleNav={toggleNav} isOpen={isOpen}></Nav>
    </div>
  );
}

export default App;
