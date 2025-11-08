import { useState, useEffect } from "react";
import { gsap } from "gsap";
import "./dates.css";
import aclogo from "../../IMGs/title-img.png";
import finalArt from "../../IMGs/final-art.png";

export default function Dates({
  navHeight,
  showPastDates,
  dateData,
  setDateData,
  popupOpen,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  //   ? USE EFFECT
  useEffect(() => {
    // Update date every minute
    const dateCheck = () => {
      const now = new Date();
      setCurrentDate(now);
    };

    setDateData((prev) =>
      prev.map((obj) => ({ ...obj, open: new Date() > obj.expire }))
    );

    // check every minute
    const interval = setInterval(dateCheck, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, [setCurrentDate, currentDate, setDateData]);

  //   ? Click a day
  const clickDay = (e, index) => {
    // If day can be opened
    if (
      currentDate > dateData[index === 0 ? index : index - 1].expire &&
      e.open === false
    ) {
      // set day to opened
      setDateData((prev) =>
        prev.map((day, i) => (i === index ? { ...day, open: !day.open } : day))
      );

      popupOpen(index);

      gsap.to(`#cal-num-${index}`, {
        rotateY: 90,
        duration: 0.5,
      });
    } else if (currentDate < e.expire && e.open === false) {
      // Day cannot open yet
      popupOpen(index);
    }
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
              return (
                <div id={`cal-${index}`} key={`cal-${index}`}>
                  {/* Apply expiration conditional & Past Date function */}
                  {showPastDates ? (
                    <div className='calendar-day' id={`cal-num-${index}`}>
                      <img
                        src={e.calImg}
                        alt={`cal-alt-${index}`}
                        width='100%'
                        style={{ width: "100%" }}
                        onClick={() => clickDay(e, index)}
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
                          onClick={() => clickDay(e, index)}
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
