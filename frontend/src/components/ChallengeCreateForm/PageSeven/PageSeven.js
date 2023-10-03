import React from "react";
import StripeContainer from './StripeContainer'
import './PageSeven.css';

const PageSeven = ({ incentiveAmount, handlePaymentId, setShowPaymentMessage }) => {
  return (
    <div>
      <h1 className="PageSevenHeader">Payment Form</h1>
      <StripeContainer 
        incentiveAmount={incentiveAmount} 
        handlePaymentId={handlePaymentId} 
        setShowPaymentMessage={setShowPaymentMessage}
      />
    </div>
  );
};


export default PageSeven;
