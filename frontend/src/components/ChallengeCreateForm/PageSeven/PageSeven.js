import React from "react";
import StripeContainer from './StripeContainer'

const PageSeven = ({ incentiveAmount, handlePaymentId }) => {
  return (
    <div>
      <h1>Payment Form</h1>
      <StripeContainer 
        incentiveAmount={incentiveAmount} 
        handlePaymentId={handlePaymentId} 
      />
    </div>
  );
};


export default PageSeven;