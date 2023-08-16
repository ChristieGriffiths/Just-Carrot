import React, { useState } from "react";
import "./PageTwo.css";

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const PageTwo = ({ onButtonClick, completeDate, handleCompleteDate }) => {
    const [chosenDate, setChosenDate] = useState("Choose Date        \u{1F4C5}")

    return (
      <main className="container">
      <form className="measure">
          <h2>Complete challenge by:</h2>
          <DatePicker
              className="date-picker"
              placeholderText={chosenDate}
              id="complete-date"
              selected={completeDate}
              onChange={(date) => setChosenDate(date)}
              showTimeSelect
              popperPlacement="bottom-start"
              // Add any necessary styling or configuration options for the time picker here
              timeFormat="HH:mm" // Example time format
          />
          <div className="">
              <input
                  className="f6 grow br2 ph3 pv2 mb2 dib white"
                  style={{ borderStyle: "none", width: "100%", backgroundColor: '#f39200' }}
                  type="submit"
                  value="Next"
                  onClick={() => onButtonClick("pagethree")}
              />
          </div>
      </form>
  </main>
    );
}

export default PageTwo;