import React, { useState, useEffect } from "react";
import "./PageTwo.css";

const PageTwo = ({ onButtonClick, handleCompleteDate, handleCompleteTime }) => {
  // Generate the current date and time
  const currentDate = new Date();

  // Extract and format the date
  const formattedDate = currentDate.toISOString().split("T")[0];
  // Extract and format the time
  const formattedTime =
    String(currentDate.getHours()).padStart(2, "0") +
    ":" +
    String(currentDate.getMinutes()).padStart(2, "0");

  // Use useState to set the default date and time
  const [date, setDate] = useState(formattedDate);
  const [time, setTime] = useState(formattedTime);

  // Use useEffect to update handleCompleteDate and handleCompleteTime initially
  useEffect(() => {
    handleCompleteDate({ target: { value: formattedDate } });
    handleCompleteTime({ target: { value: formattedTime } });
  }, []);

  return (
    <main className="container">
      <h2>Complete challenge by:</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          handleCompleteDate(e);
        }}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => {
          setTime(e.target.value);
          handleCompleteTime(e);
        }}
      />
      <div className="next-button">
        <input
          className="f6 grow br2 ph3 pv2 mb2 dib white"
          style={{ borderStyle: "none", width: "100%", backgroundColor: "#f39200" }}
          type="submit"
          value="Next"
          onClick={() => onButtonClick("pagethree")}
        />
      </div>
    </main>
  );
};

export default PageTwo;
