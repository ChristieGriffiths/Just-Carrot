import React from "react";
import "./PageOne.css";

const PageOne = ({ onButtonClick}) => {

  return (
    <main
      className="pt5 black-80 center"
      style={{ maxWidth: "40%", maxHeight: "30%", margin: "auto" }}
    >
      <form className="measure">
        <h2>Enter your challenge: </h2>
    
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <div className="mt3">
       
            <input
              className="f6 br2 ph3 pv2 mb2 dib black w-100"
              type="text"
              name="full-name"
              id="full-name"
              size="30"
              placeholder="Run for 10 minutes"
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#EAEEF5",
              }}
            />
          </div>
    
        </fieldset>
        <div>
          <input
            className="f6 grow br2 ph3 pv2 mb2 dib white"
            style={{
              borderStyle: "none",
              width: "100%",
              backgroundColor: "#f39200",
            }}
            type="submit"
            value="Next"
            onClick={() => onButtonClick("pagetwo")}
          />
        </div>
      </form>
    </main>
  );
};

export default PageOne;
