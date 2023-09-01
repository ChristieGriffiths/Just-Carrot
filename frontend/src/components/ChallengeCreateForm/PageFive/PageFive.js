import React, { useState } from "react";
import "./PageFive.css";

const PageFive = ({ onButtonClick, handleChosenValidation }) => {
  // Changed the initial value to a string and the state variable name
  const [selectedVerificationMethod, setSelectedVerificationMethod] = useState(null);

  // Modified to handle string values instead of index
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
      <div className="mw5 bg-white pa2-ns mt5 dib">
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
        className="f6 grow br2 ph3 pv2 mb2 dib white"
        style={{ borderStyle: "none", width: "11%", backgroundColor: "#f39200" }}
        type="submit"
        value="Next"
        onClick={() => onButtonClick("pagesix")}
      />
    </main>
  );
};

export default PageFive;
