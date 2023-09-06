import React from 'react';
import './MultiStepProgressBar.css';
import { ProgressBar, Step } from 'react-step-progress-bar';

const MultiStepProgressBar = ({ page, onPageNumberClick }) => {
  var stepPercentage = 0;

  const pagePercentages = {
    'pageone': 0,
    'pagetwo': 16,
    'pagethree': 33,
    'pagefour': 50,
    'pagefive': 66,
    'pagesix': 83,
    'pageseven': 100,
  };

  stepPercentage = pagePercentages[page] || 0;

  return (
    <ProgressBar percent={stepPercentage}>
      {['1', '2', '3', '4', '5', '6', '7'].map((pageNumber, index) => (
        <Step key={index}>
          {({ accomplished }) => (
            <div
              className={`indexedStep ${accomplished ? 'accomplished' : ''}`}
              onClick={() => onPageNumberClick(pageNumber)}
            >
              {index + 1}
            </div>
          )}
        </Step>
      ))}
    </ProgressBar>
  );
};

export default MultiStepProgressBar;
