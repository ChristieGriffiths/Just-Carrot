import React, { useState } from "react";
import './ChallengeCreateForm.css';
import PageOne from "./PageOne/PageOne";
import PageTwo from "./PageTwo/PageTwo";
import PageThree from "./PageThree/PageThree";
import PageFour from "./PageFour/PageFour";
import PageFive from "./PageFive/PageFive";
import PageSix from "./PageSix/PageSix";
import PageSeven from "./PageSeven/PageSeven";
import MultiStepProgressBar from "./MultiStepProgressBar/MultiStepProgressBar";
import jwt_decode from 'jwt-decode';
import tachyons from "tachyons";
import Logo from "./Logo/Logo";

import "react-datepicker/dist/react-datepicker.css"


const ChallengeCreateForm = ({token, setToken, setViewForm} ) => {
  const [challenge, setChallenge] = useState("");
  const [completeDate, setCompleteDate] = useState(null);
  const [completeTime, setCompleteTime] = useState(null);
  const [incentiveAmount, setIncentiveAmount] = useState("15");
  const [chosenCharity, setChosenCharity] = useState("");
  const [chosenValidation, setChosenValidation] = useState("");
  
  const [page, setPage] = useState("pageone");

  const nextPage = (page) => {
    setPage(page);
  };

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case '1':
        setPage('pageone');
        break;
      case '2':
        setPage('pagetwo');
        break;
      case '3':
        setPage('pagethree');
        break;
      case '4':
        setPage('pagefour');
        break;
      case '5':
        setPage('pagefive');
        break;
      case '6':
        setPage('pagesix');
        break;
      case '7':
        alert('This is Page 7!'); // You can replace this line with your logic
        break;
      default:
        setPage('1');
    }
  };
  


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const decoded = jwt_decode(token);
      console.log('Decoded:', decoded);  // Log the entire decoded payload
  
      const userId = decoded.user_id;

      console.log('userId should console', userId);
  
  
      const response = await fetch('/posts', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          challenge,
          completeDate,
          completeTime,
          incentiveAmount,
          chosenCharity,
          chosenValidation
        })
      });
  
      if (response.status === 201) {
        console.log("Successfully submitted")
        let data = await response.json();
        setToken(data.token);
        // reset form states
      } else if (response.status === 400) {
        // Handle bad request
        console.log("Bad request");
      } else {
        // Handle other statuses
        console.log("Failed to submit");
      }
    } catch (error) {
      console.log("An error occurred", error);
    }
  };
  
  
  const handleChallengeChange = (event) => {
    setChallenge(event.target.value)
    console.log('does this get consoled?')
  }

  const handleCompleteDate = (event) => {
    setCompleteDate(event.target.value)
    console.log('this is completeDate', completeDate)
  }

  const handleCompleteTime = (event) => {
    setCompleteTime(event.target.value)
  }

  const handleIncentiveAmount = (event) => {
    setIncentiveAmount(event.target.value);
  }

  const handleChosenCharity = (charityName) => {
    setChosenCharity(charityName)
    console.log(charityName);
  }
  const handleChosenValidation = (validation) => {
    setChosenValidation(validation)
    console.log(validation);
  }


  return (
    <div className="App">
      <Logo />
      <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      {{
        pageone: <PageOne onButtonClick={nextPage} handleChallengeChange={handleChallengeChange} />,
        pagetwo: <PageTwo onButtonClick={nextPage} completeDate={completeDate} handleCompleteDate={handleCompleteDate} handleCompleteTime={handleCompleteTime} />,
        pagethree: <PageThree onButtonClick={nextPage} handleIncentiveAmount={handleIncentiveAmount} incentiveAmount={incentiveAmount} />,
        pagefour: <PageFour onButtonClick={nextPage} handleChosenCharity={handleChosenCharity} />,
        pagefive: <PageFive onButtonClick={nextPage} handleChosenValidation={handleChosenValidation} />,
        pagesix: <PageSix onButtonClick={nextPage} challenge={challenge} completeDate={completeDate} completeTime={completeTime} incentiveAmount={incentiveAmount} chosenCharity={chosenCharity} chosenValidation={chosenValidation} handleSubmit={handleSubmit} />,
        pageseven: <PageSeven />, // include the new page
      }[page]}
    </div>
  );
  };

export default ChallengeCreateForm;
































    // <form onSubmit= {handleSubmit} id='form' >
    //   <input placeholder="Create challenge" id="challenge-type" type='text' value={challenge} onChange={handleChallengeChange}/>
     
    //   <DatePicker
    //     placeholderText="Complete by"
    //     id="complete-date"
    //     selected={completeDate}
    //     onChange={handleCompleteDate}
    //     className="date-picker"
    //   />
    //   <span>  Or I'll donate  </span>
    //   <input placeholder="£" id="incentive-amount" type='text' value ={incentiveAmount} onChange={handleIncentiveAmount}/>
    //   <span>  To  </span>
    //   <input placeholder="To Charity" id="chose-charity" type='text' value={chosenCharity} onChange={handleChosenCharity}/>
    //   <input id='submit' type="submit" value="Submit" />
    // </form> 