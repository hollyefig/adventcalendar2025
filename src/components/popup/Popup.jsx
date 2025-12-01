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
      {selectedDate.index === 0 ? (
        <Memorypopup selectedDate={selectedDate} dateData={dateData} />
      ) : new Date() > dateData[selectedDate.index - 1].expire ? (
        <Memorypopup selectedDate={selectedDate} dateData={dateData} />
      ) : (
        <Countingdown selectedDate={selectedDate} dateData={dateData} />
      )}
    </div>
  ) : (
    <></>
  );
}
