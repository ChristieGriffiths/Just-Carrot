import React, { useState, useEffect } from "react";
import "./PageTwo.css";
import 'react-datepicker/dist/react-datepicker.css';


const PageTwo = ({ onButtonClick, handleCompleteDate, handleCompleteTime }) => {
  const currentDate = new Date();

  const formattedDate = currentDate.toISOString().split("T")[0];
  const formattedTime =
    String(currentDate.getHours()).padStart(2, "0") +
    ":" +
    String(currentDate.getMinutes()).padStart(2, "0");

  const [date, setDate] = useState(formattedDate);
  const [time, setTime] = useState(formattedTime);
  const [isTimeValid, setIsTimeValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    handleCompleteDate({ target: { value: formattedDate } });
    handleCompleteTime({ target: { value: formattedTime } });
  }, []);

  const checkTimeValidity = (selectedDate, selectedTime) => {
    // const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
    // const currentTime = new Date();
    // const timeDifference = selectedDateTime - currentTime;

    // if (timeDifference >= 60 * 60 * 1000) { // At least one hour
    //   setIsTimeValid(true);
    //   setErrorMessage('');
    // } else {
    //   setIsTimeValid(false);
    //   setErrorMessage('You must give yourself at least an hour.');
    // }
    setIsTimeValid(true)
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    handleCompleteDate(e);
    checkTimeValidity(selectedDate, time);
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    setTime(selectedTime);
    handleCompleteTime(e);
    checkTimeValidity(date, selectedTime);
  };

  const handleButtonClick = () => {
    if (isTimeValid) {
      onButtonClick("pagethree");
    }
  };

  return (
    <main className="container">
      <div className="measure"> {/* Added this wrapper div */}
        <h2>Complete challenge by:</h2>
        <input
          type="date"
          className="date-picker"
          value={date}
          onChange={handleDateChange}
        />
        <input
          type="time"
          className="time-picker"
          value={time}
          onChange={handleTimeChange}
        />
        <div className="next-button">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <input
            className="f6 grow br2 ph3 pv2 mb2 dib white"
            style={{ borderStyle: "none", width: "100%", backgroundColor: "#f39200" }}
            type="submit"
            value="Next"
            onClick={handleButtonClick}
            disabled={!isTimeValid}
          />
        </div>
      </div>
    </main>
  );
};

export default PageTwo;
