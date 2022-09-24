/**
* Use the CSS tab above to style your Element's container.
*/
import React from 'react';
import {CardElement} from '@stripe/react-stripe-js';
// import './Styles.css'
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      backgroundColor:"#FFF",
      padding:"5px 10px", 
      innerHeight:"20px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  // person:{
  //   first_name: document.querySelector('.inp-person-first-name').value,
  //     last_name: document.querySelector('.inp-person-last-name').value,
  //     address: {
  //       line1: document.querySelector('.inp-person-street-address1').value,
  //       city: document.querySelector('.inp-person-city').value,
  //       state: document.querySelector('.inp-person-state').value,
  //       postal_code: document.querySelector('.inp-person-zip').value,
  //     }
  // }
};
function CardSection() {
  return (
    <label >
      {/* Card details */}
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </label>
  );
};
export default CardSection;