import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import './PaymentForm.css';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#000',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '18px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' }
    },
    invalid: {
      iconColor: '#ffc6ee',
      color: '#ffc6ee'
    }
  },
  hidePostalCode: true
};

export default function PaymentForm({ incentiveAmount, handlePaymentId }) {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const amountInCents = incentiveAmount * 100;  // Convert to cents
        const response = await axios.post('http://localhost:4000/payment', {
          amount: amountInCents,
          id
        });

        if (response.data.success) {
          console.log('Successful payment');
          setSuccess(true);
          console.log('this should display paymentIntentId', response.data.paymentIntentId)
          handlePaymentId(response.data.paymentIntentId);
        }

      } catch (error) {
        console.log('Error', error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button>Pay</button>
        </form>
      ) : (
        <div>
          <h2>Good luck!</h2>
        </div>
      )}
    </>
  );
}