import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Countingdown({ selectedDate, dateData }) {
  const wrapper = useRef(null);

  // get target date
  const targetDate =
    dateData[selectedDate.index !== 0 ? selectedDate.index - 1 : 0].expire;
  const [timeLeft, setTimeLeft] = useState({});

  // ? USE EFFECT
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        // Countdown is over
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown(); // Run immediately
    const interval = setInterval(updateCountdown, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup
  }, [targetDate]);

  useGSAP(
    () => {
      gsap.fromTo(
        wrapper.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    },
    { scope: wrapper }
  );
  return (
    <div className='countdown-popup-text' ref={wrapper}>
      <div className='countdown-content-wrapper'>
        <div className='cd-content-1'>This memory can be unlocked in</div>
        {/* countdown timer */}
        <div className='cd-content-2'>
          <div className='cd-days-wrapper'>
            <div className='cd-days-num coundtdown-style'>
              {timeLeft.days ?? 0}
            </div>
            <div className='cd-days-text'>
              {timeLeft.days === 1 ? `Day` : `Days`}
            </div>
          </div>
          <div className='colon coundtdown-style'>:</div>
          <div className='cd-hours-wrapper'>
            <div className='cd-hours-num coundtdown-style'>
              {timeLeft.hours ?? 0}
            </div>
            <div className='cd-hours-text'>
              {timeLeft.hours === 1 ? `Hour` : `Hours`}
            </div>
          </div>
          <div className='colon coundtdown-style'>:</div>
          <div className='cd-minutes-wrapper'>
            <div className='cd-minutes-num coundtdown-style'>
              {timeLeft.minutes ?? 0}
            </div>
            <div className='cd-minutes-text'>Minutes</div>
          </div>
          <div className='colon coundtdown-style'>:</div>
          <div className='cd-seconds-wrapper'>
            <div className='cd-seconds-num coundtdown-style'>
              {timeLeft.seconds ?? 0}
            </div>
            <div className='cd-seconds-text'>Seconds</div>
          </div>
        </div>
      </div>
      <div className='countdown-number-wrapper'>
        <img src={dateData[selectedDate.index].calImg} alt='' />
      </div>
    </div>
  );
}
