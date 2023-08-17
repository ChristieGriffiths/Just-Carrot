import React, { useState }  from "react";
import "./PageFive.css"

const PageFive = ({ onButtonClick }) => {
  const [selectedVerificationIndex, setSelectedVerificationIndex] = useState(null);

  const toggleSelected = (index) => {
    setSelectedVerificationIndex(index === selectedVerificationIndex ? null : index);
    console.log(index)
  };

  return (
    <main>
      <div className="mw5 bg-white pa2-ns mt5 dib">
        <h2>How would you like to verify completion:</h2>
      </div>
      <div className="options">
        <div
          className={`photo ${selectedVerificationIndex === 0 ? 'selected' : ''}`}
          onClick={() => toggleSelected(0)}
        >
        <h1>Photo</h1>
        </div>
        <div
          className={`selfVerify ${selectedVerificationIndex === 1 ? 'selected' : ''}`}
          onClick={() => toggleSelected(1)}
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