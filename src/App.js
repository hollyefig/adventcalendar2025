import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { initialDateData } from "./components/dates/initialDateData";
import "./App.css";
import Dates from "./components/dates/Dates";
import Nav from "./components/nav/Nav";
import Popup from "./components/popup/Popup";

function App() {
  const [blackBackdrop, setBlackBackdrop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [navHeight, setNavHeight] = useState();
  const [showPastDates, setShowPastDates] = useState(false);
  const [dateData, setDateData] = useState(initialDateData);

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
        tl.to(".black-backdrop", { opacity: 0, duration: 0.2 }).to(
          ".black-backdrop",
          { display: "none" },
          "<.1"
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

  // Popup display
  const popupOpen = (e, index) => {
    console.log("opened", e, index);
  };

  return (
    <div className='App default-font'>
      <Dates
        navHeight={navHeight}
        setBlackBackdrop={setBlackBackdrop}
        showPastDates={showPastDates}
        dateData={dateData}
        setDateData={setDateData}
        popupOpen={popupOpen}
      ></Dates>
      <div
        className='black-backdrop'
        onClick={() => isOpen && toggleNav()}
      ></div>
      <Popup popupOpen={popupOpen}></Popup>
      <Nav
        toggleNav={toggleNav}
        isOpen={isOpen}
        setNavHeight={setNavHeight}
        showPastDates={showPastDates}
        setShowPastDates={setShowPastDates}
        dateData={dateData}
        setDateData={setDateData}
      ></Nav>
    </div>
  );
}

export default App;
