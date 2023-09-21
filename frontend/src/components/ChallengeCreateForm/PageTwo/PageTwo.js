import React, { useState, useEffect } from "react";
import "./PageTwo.css";
import 'react-datepicker/dist/react-datepicker.css';

const PageTwo = ({ onButtonClick, handleCompleteDate, handleCompleteTime }) => {
  const currentDate = new Date();

  const formattedDate = currentDate.toISOString().split("T")[0];
  const formattedTime = `${String(currentDate.getHours()).padStart(2, "0")}:${String(currentDate.getMinutes()).padStart(2, "0")}`;

  const [date, setDate] = useState(formattedDate);
  const [time, setTime] = useState(formattedTime);
  const [isTimeValid, setIsTimeValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    handleCompleteDate({ target: { value: formattedDate } });
    handleCompleteTime({ target: { value: formattedTime } });
  }, []);

  const checkTimeValidity = (selectedDate, selectedTime) => {
    setIsTimeValid(true); // For demonstration
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
    <main className="main-container">
      <div className="form-wrapper">
        <h1>Complete challenge by:</h1>
        <input
          type="date"
          className="date-input"
          value={date}
          onChange={handleDateChange}
        />
        <input
          type="time"
          className="time-input"
          value={time}
          onChange={handleTimeChange}
        />
        <div className="button-wrapper">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <input
            className="next-button"
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
