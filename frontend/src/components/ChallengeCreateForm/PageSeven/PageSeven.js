import React from "react";
import StripeContainer from './StripeContainer'

const PageSeven = ({ handleFormSubmit, handlePaymentId }) => {
  return (
    <div>
      <h1>Payment Form</h1>
      <StripeContainer 
        handleFormSubmit={handleFormSubmit} 
        handlePaymentId={handlePaymentId} 
      />
    </div>
  );
};


export default PageSeven;