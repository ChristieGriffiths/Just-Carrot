import React from "react";

import "./PageThree.css";
import Slider from '@mui/material/Slider';

const PageThree = ({onButtonClick, incentiveAmount, handleIncentiveAmount}) => {


  const valueLabelFormat = (value) => {
    return `£${value}`;
  };

  return (
    <main className="pt5 black-80" style={{ maxWidth: "50%", maxHeight: "25%", margin: "auto" }}>
      <h1>Choose your incentive:</h1>
  
      <div className="slider">
        <Slider size="large"
          min={5} defaultValue={incentiveAmount} 
          valueLabelDisplay="on" 
          valueLabelFormat={valueLabelFormat}
          style={{ color: '#f39200' }}
          onChange={handleIncentiveAmount}
        /> 
      </div>
  
      <input
        className="f6 grow br2 ph3 pv2 mb2 dib white submitButton"
        style={{ borderStyle: "none", width: "66%", backgroundColor: "#f39200" }}
        type="submit"
        value="Next"
        onClick={() => onButtonClick("pagefour")}
      />
    </main>
  );
  
}

export default PageThree;