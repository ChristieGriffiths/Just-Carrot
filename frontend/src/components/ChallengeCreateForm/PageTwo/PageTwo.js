import React, { useState, useEffect } from "react";
import "./PageTwo.css";

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
    const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const currentTime = new Date();
    const timeDifference = selectedDateTime - currentTime;

    if (timeDifference >= 60 * 60 * 1000) { // At least one hour
      setIsTimeValid(true);
      setErrorMessage('');
    } else {
      setIsTimeValid(false);
      setErrorMessage('You must give yourself at least an hour.');
    }
  };

  return (
    <main className="container">
      <h2>Complete challenge by:</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          handleCompleteDate(e);
          checkTimeValidity(e.target.value, time);
        }}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => {
          setTime(e.target.value);
          handleCompleteTime(e);
          checkTimeValidity(date, e.target.value);
        }}
      />
      <div className="next-button">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <input
          className="f6 grow br2 ph3 pv2 mb2 dib white"
          style={{ borderStyle: "none", width: "100%", backgroundColor: "#f39200" }}
          type="submit"
          value="Next"
          onClick={() => onButtonClick("pagethree")}
          disabled={!isTimeValid}
        />
      </div>
    </main>
  );
};

export default PageTwo;
