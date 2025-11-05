import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import "./dates.css";
import aclogo from "../../IMGs/title-img.png";
import finalArt from "../../IMGs/final-art.png";
import { dateData } from "./dateData";

export default function Dates({ navHeight, setBlackBackdrop, showPastDates }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  //   ? USE EFFECT
  useEffect(() => {
    const dateCheck = () => {
      setCurrentDate(new Date());
    };

    // check every minute
    const interval = setInterval(dateCheck, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, [setCurrentDate]);

  //   ? Click a day
  const clickDay = (e, index) => {
    console.log("click", e, index);
    // setBlackBackdrop(true);

    gsap.to(`#cal-num-${index}`, {
      rotateY: 90,
      duration: 0.5,
    });
  };

  //   BODY
  return (
    <div
      className='dates-wrapper'
      style={{ padding: `2em 0 ${navHeight}px 0` }}
    >
      <div className='dates-top'>
        <img
          src={aclogo}
          width='517'
          style={{ maxWidth: "250px", width: "100%", height: "auto" }}
          alt='ac-logo'
        />
      </div>
      {/* bottom */}
      <div className='dates-bottom'>
        <div className='dates-grid-wrapper'>
          <div className='final-art-wrapper'>
            <img
              src={finalArt}
              width='100%'
              style={{ width: "100%", height: "auto" }}
              alt='final-art'
            />
          </div>
          {/* Dates grid */}
          <div className='dates-grid'>
            {dateData.map((e, index) => {
              index = index + 1;
              console.log(!showPastDates);
              return (
                <div
                  id={`cal-${index}`}
                  key={`cal-${index}`}
                  onClick={() => clickDay(e, index)}
                >
                  {/* Apply expiration conditional & Past Date function */}
                  {showPastDates ? (
                    <div className='calendar-day' id={`cal-num-${index}`}>
                      <img
                        src={e.calImg}
                        alt={`cal-alt-${index}`}
                        width='100%'
                        style={{ width: "100%" }}
                      />
                    </div>
                  ) : (
                    currentDate < e.expire && (
                      <div className='calendar-day' id={`cal-num-${index}`}>
                        <img
                          src={e.calImg}
                          alt={`cal-alt-${index}`}
                          width='100%'
                          style={{ width: "100%" }}
                        />
                      </div>
                    )
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
