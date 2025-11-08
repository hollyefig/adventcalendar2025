import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { initialDateData } from "./components/dates/initialDateData";
import "./App.css";
import Dates from "./components/dates/Dates";
import Nav from "./components/nav/Nav";
import Popup from "./components/popup/Popup";

function App() {
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
    const backdropOn = navIsOpen || selectedDate.isPopupOpen;

    const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });

    // Backdrop animation
    if (backdropOn) {
      tl.to(".black-backdrop", { display: "block" }).to(
        ".black-backdrop",
        { opacity: 0.6, duration: 0.2 },
        "<"
      );
    } else {
      tl.to(".black-backdrop", { opacity: 0, duration: 0.2 }).to(
        ".black-backdrop",
        { display: "none" },
        "<"
      );
    }

    return () => tl.kill();
  }, [navIsOpen, selectedDate]);

  // Popup display
  const popupOpen = (i) => {
    setSelectedDate((prev) => ({
      ...prev,
      index: i,
      isPopupOpen: true,
    }));
  };

  // backdrop is clicked
  const backdropClick = () => {
    setNavIsOpen(false);
    setSelectedDate((prev) => ({ ...prev, isPopupOpen: false }));
  };

  return (
    <div className='App default-font'>
      <Dates
        navHeight={navHeight}
        showPastDates={showPastDates}
        dateData={dateData}
        setDateData={setDateData}
        popupOpen={popupOpen}
      />
      <div className='black-backdrop' onClick={backdropClick}></div>
      <Popup
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        dateData={dateData}
      />
      <Nav
        navIsOpen={navIsOpen}
        setNavHeight={setNavHeight}
        showPastDates={showPastDates}
        setShowPastDates={setShowPastDates}
        setDateData={setDateData}
        setNavIsOpen={setNavIsOpen}
      />
    </div>
  );
}

export default App;
