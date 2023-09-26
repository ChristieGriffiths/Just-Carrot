import React, { useState } from "react";
import "./PageFive.css";

const PageFive = ({ onButtonClick, handleChosenValidation }) => {
  const [selectedVerificationMethod, setSelectedVerificationMethod] = useState(null);

  const toggleSelected = (method) => {
    if (selectedVerificationMethod === method) {
      setSelectedVerificationMethod(null);
      handleChosenValidation(null);
    } else {
      setSelectedVerificationMethod(method);
      handleChosenValidation(method);
    }
  };

  return (
    <main>
      <div className="mw5 transparent-bg pa2-ns mt5 dib">
        <h2>How would you like to verify completion:</h2>
      </div>
      <div className="options">
        <div
          className={`photo ${selectedVerificationMethod === 'Photo' ? 'selected' : ''}`}
          onClick={() => toggleSelected('Photo')}
        >
          <h1>Photo</h1>
        </div>
        <div
          className={`selfVerify ${selectedVerificationMethod === 'Self-Verify' ? 'selected' : ''}`}
          onClick={() => toggleSelected('Self-Verify')}
        >
          <h1>Self-Verify</h1>
        </div>
      </div>
      <input
        className="PageFiveNextButton"
        style={{ borderStyle: "none", width: "11%", backgroundColor: "#f39200" }}
        type="submit"
        value="Next"
        onClick={() => onButtonClick("pagesix")}
      />
    </main>
  );
};

export default PageFive;
