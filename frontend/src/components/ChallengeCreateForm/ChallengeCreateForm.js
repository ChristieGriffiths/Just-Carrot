import React, { useState } from "react";
import './PostCreateForm.css';


const ChallengeCreateForm = ({token, setToken}) => {


<div>
  <form onSubmit= {handleSubmit} id='form' >
    <input placeholder="Create challenge" id="challenge-type" type='text' value={challenge} onChange={handleChallengeChange}/>
    <input placeholder="Complete by" id="complete-date" type='text' value={completeDate} onChange={handleCompleteDate}/> 
    <span>  Or I'll donate  </span>
    <input placeholder="£" id="incentive-amount" type='text' value ={incentiveAmount} onChange={handleIncentiveAmount}/>
    <span>  To  </span>
    <input placeholder="To Charity" id="chose-charity" type='text' value={chosenCharity} onChange={handleChosenCharity}/>
  <input id='submit' type="submit" value="Submit" />
  </form> 
</div>

}

export default ChallengeCreateForm;