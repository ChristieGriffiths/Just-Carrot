import React from "react";

const PageSix = ({
  challenge,
  completeDate,
  completeTime,
  incentiveAmount,
  chosenCharity,
  chosenValidation,
}) => {
  return (
    <main className="confirmation-page">
      <h2>Confirmation</h2>

      <div className="options">
        <div className="choice-container">
          <h3>Challenge:</h3>
          <div className="choice-content">
            <h1>{challenge}</h1>
          </div>
        </div>

        <div className="choice-container">
          <h3>Completion Date:</h3>
          <div className="choice-content">
            <h1>{completeDate}</h1>
          </div>
        </div>

        <div className="choice-container">
          <h3>Completion Time:</h3>
          <div className="choice-content">
            <h1>{completeTime}</h1>
          </div>
        </div>

        <div className="choice-container">
          <h3>Incentive Amount:</h3>
          <div className="choice-content">
            <h1>{incentiveAmount}</h1>
          </div>
        </div>

        <div className="choice-container">
          <h3>Chosen Charity:</h3>
          <div className="choice-content">
            <h1>{chosenCharity}</h1>
          </div>
        </div>

        <div className="choice-container">
          <h3>Chosen Validation:</h3>
          <div className="choice-content">
            <h1>{chosenValidation}</h1>
          </div>
        </div>
      </div>

      <input
        className="f6 grow br2 ph3 pv2 mb2 dib white"
        style={{ borderStyle: "none", width: "11%", backgroundColor: "#f39200" }}
        type="submit"
        value="Confirm"
      />
    </main>
  );
};

export default PageSix;
