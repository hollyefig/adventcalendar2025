import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { initialDateData } from "./components/dates/initialDateData";
import "./App.css";
import Dates from "./components/dates/Dates";
import Nav from "./components/nav/Nav";
import Popup from "./components/popup/Popup";

function App() {
  const [blackBackdrop, setBlackBackdrop] = useState(false);
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [navHeight, setNavHeight] = useState();
  const [showPastDates, setShowPastDates] = useState(false);
  const [dateData, setDateData] = useState(initialDateData);
  const [selectedDate, setSelectedDate] = useState({
    index: 0,
    isPopupOpen: false,
  });

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
  }, [blackBackdrop, navIsOpen, selectedDate, dateData]);

  // Nav toggle
  const toggleNav = () => {
    setNavIsOpen((prev) => !prev);
    setBlackBackdrop((prev) => !prev);
  };

  // backdrop function
  const blackBackdropFunc = () => {
    navIsOpen && toggleNav();
    setBlackBackdrop((prev) => !prev);
  };

  // Popup display
  const popupOpen = (i) => {
    setSelectedDate((prev) => ({
      ...prev,
      index: i,
      isPopupOpen: true,
    }));

    return i;
  };

  return (
    <div className='App default-font'>
      <Dates
        navHeight={navHeight}
        showPastDates={showPastDates}
        dateData={dateData}
        setDateData={setDateData}
        popupOpen={popupOpen}
        setBlackBackdrop={setBlackBackdrop}
      />
      <div className='black-backdrop' onClick={() => blackBackdropFunc()}></div>
      <Popup
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        dateData={dateData}
        blackBackdropFunc={blackBackdropFunc}
      />
      <Nav
        toggleNav={toggleNav}
        navIsOpen={navIsOpen}
        setNavHeight={setNavHeight}
        showPastDates={showPastDates}
        setShowPastDates={setShowPastDates}
        setDateData={setDateData}
      />
    </div>
  );
}

export default App;
