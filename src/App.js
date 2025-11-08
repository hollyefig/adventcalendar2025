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
    // Lock body tag on popup open
    if (selectedDate.isPopupOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100dvw";
      document.body.style.height = "100dvh";
    } else {
      // reset everything
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    }

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

    return () => {
      document.body.style.overflow = "";
    };
  }, [blackBackdrop, navIsOpen, selectedDate, dateData]);

  // Nav toggle
  const toggleNav = () => {
    setNavIsOpen((prev) => !prev);
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
      ></Dates>
      <div
        className='black-backdrop'
        onClick={() => navIsOpen && toggleNav()}
      ></div>
      <Popup
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        dateData={dateData}
      ></Popup>
      <Nav
        toggleNav={toggleNav}
        navIsOpen={navIsOpen}
        setNavHeight={setNavHeight}
        showPastDates={showPastDates}
        setShowPastDates={setShowPastDates}
        setDateData={setDateData}
      ></Nav>
    </div>
  );
}

export default App;
