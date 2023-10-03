import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import './PaymentForm.css';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: 'black',
      color: '#000',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '32px',  // Changed font size to 24px
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: 'black' }
    },
    invalid: {
      iconColor: '#ffc6ee',
      color: '#ffc6ee'
    }
  },
  hidePostalCode: true
};
export default function PaymentForm({ incentiveAmount, handlePaymentId, setShowPaymentMessage }) {
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
        const amountInCents = incentiveAmount * 100;
        const response = await axios.post('/api/payment', {
          amount: amountInCents,
          id
        });

        if (response.data.success) {
          handlePaymentId(response.data.paymentIntentId);
          setShowPaymentMessage(true)
          setTimeout(() => {
            setShowPaymentMessage(false);
          }, 10000);
        }
      } catch (error) {
        console.log('Error', error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div className="PaymentFormContainer">
        <form className="Form" onSubmit={handleSubmit} >
              <CardElement options={CARD_OPTIONS} />
          <button className="PaymentButton" type="submit">Pay</button>
        </form>
    </div>
  );
}