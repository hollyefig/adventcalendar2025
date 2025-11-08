import Countingdown from "./Countingdown";
import Memorypopup from "./Memorypopup";
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
        {new Date() >
        dateData[selectedDate.index !== 0 ? selectedDate.index - 1 : 0]
          .expire ? (
          // Open and showcase memory
          <Memorypopup selectedDate={selectedDate} dateData={dateData} />
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
