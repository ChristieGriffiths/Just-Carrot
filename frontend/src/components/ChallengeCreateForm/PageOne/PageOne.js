import React from "react";
import "./PageOne.css";

const PageOne = ({ onButtonClick}) => {

  return (
    <main
      className="pt5 black-80 center"
      style={{ maxWidth: "40%", maxHeight: "30%", margin: "auto" }}
    >
      <form className="measure">
        <h2>Enter your challenge ...</h2>
    
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <div className="mt3">
            <label
              className="db lh-copy f6 mb1"
              htmlFor="full-name"
              style={{ textAlign: "left" }}
            >
              Challenge
            </label>
            <input
              className="f6 br2 ph3 pv2 mb2 dib black w-100"
              type="text"
              name="full-name"
              id="full-name"
              size="30"
              placeholder="Steve Jobs"
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
              backgroundColor: "#664DE5",
            }}
            type="submit"
            value="Create Workspace"
            onClick={() => onButtonClick("pagetwo")}
          />
        </div>
      </form>
    </main>
  );
};

export default PageOne;
