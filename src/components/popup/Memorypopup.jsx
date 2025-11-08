import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Memorypopup({ selectedDate, dateData }) {
  const wrapper = useRef(null);

  //   & USE GSAP for animating in
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
    <div className='display-popup-text' ref={wrapper}>
      This date is open, {dateData[selectedDate.index].text}
    </div>
  );
}
