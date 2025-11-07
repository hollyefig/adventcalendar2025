import React, { useRef, useEffect, useState } from "react";
import "./popup.css";
import { dateData } from "../dates/initialDateData";

export default function Popup() {
  const popupRef = useRef(null);
  const [popupSize, setpopupSize] = useState({
    startWidth: window.innerWidth,
    startHeight: window.innerHeight,
    changeWidth: null,
    changeHeight: null,
    popupWidth: null,
    popupHeight: null,
  });

  // ? USE EFFECT
  useEffect(() => {
    const popupSizeFunc = (e) => {
      if (popupRef.current) {
        setpopupSize((prev) => ({
          ...prev,
          popupWidth: popupRef.current.offsetWidth,
          popupHeight: popupRef.current.offsetHeight,
          changeWidth: e !== undefined && e.currentTarget.innerWidth,
          changeHeight: e !== undefined && e.currentTarget.innerHeight,
        }));
      }
    };

    popupSizeFunc();

    window.addEventListener("resize", (e) => popupSizeFunc(e));

    return () => {
      window.removeEventListener("resize", (e) => popupSizeFunc(e));
    };
  }, [popupRef, setpopupSize]);

  return (
    <div className='popup-wrapper' ref={popupRef}>
      Popup
    </div>
  );
}
