import React, { useState } from "react";
import "./PageOne.css";

const PageOne = ({ onButtonClick, handleChallengeChange }) => {
  const [inputLength, setInputLength] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleChange = (event) => {
    const text = event.target.value;
    setInputLength(text.length);
    handleChallengeChange(event);
  };

  const handleNextClick = () => {
    if (inputLength >= 3) {
      onButtonClick("pagetwo");
      setShowErrorMessage(false);
    } else {
      setShowErrorMessage(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    handleNextClick();
  };

  return (
    <main
      className="pt5 black-80 center"
      style={{ maxWidth: "40%", maxHeight: "30%", marginTop: "20px" }}
    >
      <form className="measure" onSubmit={handleSubmit}>
        <h2>Enter your challenge: </h2>

        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <div className="mt3">
            <input
              className="f6 br2 ph3 pv2 mb2 dib black w-100"
              type="text"
              size="30"
              placeholder="Run for 10 minutes"
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {showErrorMessage && <p>Please enter a challenge.</p>}

        <div>
          <input
            className="f6 grow br2 ph3 pv2 mb2 dib white"
            style={{
              borderStyle: "none",
              width: "100%",
              backgroundColor: "#f39200",
            }}
            type="button"
            value="Next"
            onClick={handleNextClick}
          />
        </div>
      </form>
    </main>
  );
};

export default PageOne;
