import React, { useState } from "react";
import './ChallengeCreateForm.css';


import DatePicker from "react-datepicker"; // Import the DatePicker component
import "react-datepicker/dist/react-datepicker.css"; // Import the DatePicker CSS


const ChallengeCreateForm = ({token, setToken}) => {
  const [challenge, setChallenge] = useState("");
  const [completeDate, setCompleteDate] = useState(null); // Initialize with null
  const [incentiveAmount, setIncentiveAmount] = useState("");
  const [chosenCharity, setChosenCharity] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch('/posts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ challenge: challenge, completeDate: completeDate, incentiveAmount: incentiveAmount, chosenCharity: chosenCharity })
    })

    if (response.status === 201) {
      console.log("Successfully submited")
      let data = await response.json();
      setToken(data.token);
      setChallenge("");
      setCompleteDate("");
      setIncentiveAmount("");
      setChosenCharity("")
    } else {
      console.log("Failed to submit");
    }
}
  

  const handleChallengeChange = (event) => {
    setChallenge(event.target.value)
  }

  const handleCompleteDate = (event) => {
    setCompleteDate(event.target.value)
  }

  const handleIncentiveAmount = (event) => {
    setIncentiveAmount(event.target.value)
  }

  const handleChosenCharity = (event) => {
    setChosenCharity(event.target.value)
  }

return (
    <form onSubmit= {handleSubmit} id='form' >
      <input placeholder="Create challenge" id="challenge-type" type='text' value={challenge} onChange={handleChallengeChange}/>
     
      <DatePicker
        placeholderText="Complete by"
        id="complete-date"
        selected={completeDate}
        onChange={handleCompleteDate}
        className="date-picker"
      />
      <span>  Or I'll donate  </span>
      <input placeholder="£" id="incentive-amount" type='text' value ={incentiveAmount} onChange={handleIncentiveAmount}/>
      <span>  To  </span>
      <input placeholder="To Charity" id="chose-charity" type='text' value={chosenCharity} onChange={handleChosenCharity}/>
      <input id='submit' type="submit" value="Submit" />
    </form> 
);

}

export default ChallengeCreateForm;