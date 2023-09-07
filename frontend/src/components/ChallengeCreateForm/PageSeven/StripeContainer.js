import React from 'react';
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from './PaymentForm';


const PUBLIC_KEY = "pk_test_51NmZTYF5qq7Yg7pdCvGHr85y1t8xMqNfVTA8fpbTIGbFi0qsbtC3o2bGVYaFlWhMTSCZm7ybax45QTV6KDx1lcqr00f8APjuBM"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer({ handleFormSubmit, handlePaymentId }) {
  return (
    <Elements stripe = {stripeTestPromise}>
      <PaymentForm handleFormSubmit={handleFormSubmit} handlePaymentId={handlePaymentId} /> 
    </Elements>
  )
}