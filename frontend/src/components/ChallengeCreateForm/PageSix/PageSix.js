import React from 'react';
import './PageSix.css';

const PageSix = ({
  challenge,
  completeDate,
  completeTime,
  incentiveAmount,
  chosenCharity,
  chosenValidation,
  onButtonClick
}) => {

  const formattedDate = completeDate.split('-').reverse().join('/');

  return (
    <main className="confirmation-page">
      <h1>Confirmation</h1>

      <div className="options-grid">
        <div className="choice-container">
          <h3>Challenge:</h3>
          <div className="choice-content">
            <h1>{challenge}</h1>
          </div>
        </div>

        <div className="choice-container">
          <h3>Completion By:</h3>
          <div className="choice-content">
            <h1>{formattedDate}</h1>
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
            <h1>£{incentiveAmount}</h1>
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
        style={{ borderStyle: 'none', width: '11%', backgroundColor: '#f39200' }}
        type="submit"
        value="Confirm"
        onClick={(e) => {
          e.preventDefault();
          onButtonClick('pageseven');
        }}
      />
    </main>
  );
};

export default PageSix;
