import React, { useState, useEffect } from "react";
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
import "react-datepicker/dist/react-datepicker.css"


const ChallengeCreateForm = ({token, setToken, setViewForm, setShowPaymentMessage} ) => {
  const [challenge, setChallenge] = useState("");
  const [completeDate, setCompleteDate] = useState(null);
  const [completeTime, setCompleteTime] = useState(null);
  const [incentiveAmount, setIncentiveAmount] = useState("15");
  const [chosenCharity, setChosenCharity] = useState("");
  const [chosenValidation, setChosenValidation] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("")
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
        alert('This is Page 7!'); // You can replace this line with your logic ??
        break;
      default:
        setPage('1');
    }
  };

  const handleChallengeChange = (event) => {
    setChallenge(event.target.value)
  }

  const handleCompleteDate = (event) => {
    setCompleteDate(event.target.value)
  }

  const handleCompleteTime = (event) => {
    setCompleteTime(event.target.value)
  }

  const handleIncentiveAmount = (event) => {
    setIncentiveAmount(event.target.value);
  }

  const handleChosenCharity = (charityName) => {
    setChosenCharity(charityName)
  }
  const handleChosenValidation = (validation) => {
    setChosenValidation(validation)
  }

  const handlePaymentId = (id) => {
    setPaymentIntentId(id);
  };

  const resetForm = () => {
    setChallenge("");
    setCompleteDate(null);
    setCompleteTime(null);
    setIncentiveAmount("15");
    setChosenCharity("");
    setChosenValidation("");
    setPaymentIntentId("");
    setPage("pageone");
  };
  
  useEffect(() => {
    if (paymentIntentId) {
      handleFormSubmit();
     }
  }, [paymentIntentId]);
  
  const handleFormSubmit = async () => {
    try {
      const decoded = jwt_decode(token);
      const userId = decoded.user_id;

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
          chosenValidation,
          paymentIntentId,
        })
      });
  
      if (response.status === 201) {
        console.log("Form successfully submitted")
        let data = await response.json();
        setToken(data.token);
        setViewForm(false);
        resetForm();
      } else if (response.status === 400) {
        console.log("Bad request");
      } else {
        console.log("Failed to submit");
      }
    } catch (error) {
      console.log("An error occurred", error);
    }
  };

  
  
  return (
    <div className="App">
    
      <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      {{
        pageone: <PageOne onButtonClick={nextPage} handleChallengeChange={handleChallengeChange} />,
        pagetwo: <PageTwo onButtonClick={nextPage} completeDate={completeDate} handleCompleteDate={handleCompleteDate} handleCompleteTime={handleCompleteTime} />,
        pagethree: <PageThree onButtonClick={nextPage} handleIncentiveAmount={handleIncentiveAmount} incentiveAmount={incentiveAmount} />,
        pagefour: <PageFour onButtonClick={nextPage} handleChosenCharity={handleChosenCharity} />,
        pagefive: <PageFive onButtonClick={nextPage} handleChosenValidation={handleChosenValidation} />,
        pagesix: <PageSix onButtonClick={nextPage} challenge={challenge} completeDate={completeDate} completeTime={completeTime} incentiveAmount={incentiveAmount} chosenCharity={chosenCharity} chosenValidation={chosenValidation} />,
        pageseven: <PageSeven incentiveAmount={incentiveAmount} handlePaymentId={handlePaymentId} setShowPaymentMessage={setShowPaymentMessage}/>,
      }[page]}
    </div>
  );
  };

export default ChallengeCreateForm;