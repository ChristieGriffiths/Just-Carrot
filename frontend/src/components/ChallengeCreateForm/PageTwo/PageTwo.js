import React, { useState } from "react";
import "./PageTwo.css";


const PageTwo = ({ onButtonClick, handleCompleteDate, handleCompleteTime}) => {
    const [chosenDate, setChosenDate] = useState("Choose Date        \u{1F4C5}")
    
    return (
      <main className="container">
        <h2>Complete challenge by:</h2>
        <input type="date" value="1978-05-22" onChange={handleCompleteDate} />
        <input type="time" value="08:35" onChange={handleCompleteTime} />
        <div className="next-button">
          <input
            className="f6 grow br2 ph3 pv2 mb2 dib white"
            style={{ borderStyle: "none", width: "100%", backgroundColor: '#f39200' }}
            type="submit"
            value="Next"
            onClick={() => onButtonClick("pagethree")}
          />
        </div>
      </main>
    );
    
}

export default PageTwo;