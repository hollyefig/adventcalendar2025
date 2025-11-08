import Countingdown from "./Countingdown";
import "./popup.css";

export default function Popup({ selectedDate, setSelectedDate, dateData }) {
  // & Close Popup
  const closePopup = () => {
    setSelectedDate((prev) => ({ ...prev, isPopupOpen: false }));
  };

  return selectedDate.isPopupOpen ? (
    <div className='popup-outer-wrapper' onClick={closePopup}>
      <div className='popup-wrapper'>
        {/* Check if date can open or be on countdown to open */}
        {dateData[selectedDate.index].open ? (
          // Open and showcase memory
          <div className='display-popup-text'>
            This date is open, {dateData[selectedDate.index].text}
          </div>
        ) : (
          // provide a countdown
          <Countingdown selectedDate={selectedDate} dateData={dateData} />
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}
