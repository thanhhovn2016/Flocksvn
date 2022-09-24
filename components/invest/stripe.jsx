import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import { Box, CircularProgress } from "@mui/material";
import CardSection from './cartSection';

export default function CheckoutForm({childFunc , getToken , paymentStatus}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  // const handleSubmit = async (e) => {
  //   e?.preventDefault();
  //   if (!stripe || !elements) {
  //     // Stripe.js has not yet loaded.cay
  //     // Make sure to disable form submission until Stripe.js has loaded.
  //     return;
  //   }

  //   setIsLoading(true);

  //   const { error } = await stripe.confirmPayment({
  //     elements,
  //     confirmParams: {
  //       // Make sure to change this to your payment completion page
  //       return_url: "http://localhost:3000/en/payment_status",
  //     },
  //   });

  //   // This point will only be reached if there is an immediate error when
  //   // confirming the payment. Otherwise, your customer will be redirected to
  //   // your `return_url`. For some payment methods like iDEAL, your customer will
  //   // be redirected to an intermediate site first to authorize the payment, then
  //   // redirected to the `return_url`.
  //   if (error.type === "card_error" || error.type === "validation_error") {
  //     setMessage(error.message);
  //   } else {
  //     setMessage("An unexpected error occurred.");
  //   }

  //   setIsLoading(false);
  // };

   const  stripeTokenHandler = async (token) => {
    const paymentData = {token: token.id};
  console.log("paymentData" , token)
  getToken(paymentData)
    // Use fetch to send the token ID and any other payment data to your server.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    // const response = await fetch(baseURL , {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(paymentData),
    // });
  
    // // Return and display the result of the charge.
    // return response.json();
  }

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event?.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
    } else {
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
      stripeTokenHandler(result.token);
    }
  };
const alertUser = () => {
  handleSubmit()
}
  React.useEffect(() => {
    // childFunc.current = alertUser
    if (paymentStatus){
      handleSubmit()
    }
  }, [paymentStatus])

  // useEffect(() => {
  //   if (!stripe) {
  //     return;
  //   }

  //   const clientSecret = new URLSearchParams(window.location.search).get(
  //     "payment_intent_client_secret"
  //   );

  //   if (!clientSecret) {
  //     return;
  //   }

  //   stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
  //     switch (paymentIntent.status) {
  //       case "succeeded":
  //         setMessage("Payment succeeded!");
  //         break;
  //       case "processing":
  //         setMessage("Your payment is processing.");
  //         break;
  //       case "requires_payment_method":
  //         setMessage("Your payment was not successful, please try again.");
  //         break;
  //       default:
  //         setMessage("Something went wrong.");
  //         break;
  //     }
  //   });
  // }, [stripe]);

// if (isLoading){
//   return(
//     <Box display="grid" justifyContent="center" height="5rem">
//       <CircularProgress size="4rem" />
//     </Box>
//   )
// }
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardSection />
      {/* <PaymentElement id="payment-element" /> */}
      {/* <button disabled={isLoading || !stripe || !elements} id="submit" >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"><CircularProgress size={"10px"} /></div> : "Pay now"}
        </span>
      </button> */}
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
} 