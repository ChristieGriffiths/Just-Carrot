import React, {useState} from "react";

import "./PageThree.css";
import Slider from '@mui/material/Slider';

const PageThree = ({onButtonClick}) => {

  const [singleUser, setSingleUser] = useState(false)
  
  const onClickSingleUser = () => {
    setSingleUser(prevSingleUser => !prevSingleUser)
  }

  const [multiUser, setMultiUser] = useState(false)
  
  const onClickMultiUser = () => {
    setMultiUser(prevMultiUser => !prevMultiUser)
  }

  const valueLabelFormat = (value) => {
    return `£${value}`;
  };

  return (
    <main className="pt5 black-80" style={{ maxWidth: "50%", maxHeight: "25%", margin: "auto" }}>
      <h2>Choose your incentive:</h2>
  
      <div className="slider">
        <Slider size="large"
          min={5} defaultValue={15} 
          valueLabelDisplay="on" 
          valueLabelFormat={valueLabelFormat}
          style={{ color: '#f39200' }}/>
         
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