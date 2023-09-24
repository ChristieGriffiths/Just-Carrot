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
    <main className="mainContent">
      <form className="PageOneFormContainer" onSubmit={handleSubmit}>
        <h1>Enter your challenge: </h1>
        <fieldset id="challengeField" className="noBorder">
          <div className="inputWrapper">
            <input
              className="textInput"
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
            className="nextButton"
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
