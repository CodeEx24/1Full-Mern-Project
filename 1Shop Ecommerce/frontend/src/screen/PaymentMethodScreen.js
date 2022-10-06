import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckoutSteps from '../components/CheckoutSteps';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';

export default function PaymentMethodScreen() {
  const navigate = useNavigate();

  //Getting the state in the context of the store
  const { state, dispatch: ctxDispatch } = useContext(Store);
  //Getting the shipping address and payment method coming from the state above
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  //UseState to change the payment method if the user want another methods
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'Paypal'
  );

  useEffect(() => {
    //If the shippingAddress.address value is not exist navigate user to shipping
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  //Submit handler to handle the method chosen by the user.
  function submitHandler(e) {
    e.preventDefault();
    //calling contextDispatch to change the Payment Method according to the user choices.
    ctxDispatch({ type: `SAVE_PAYMENT_METHOD`, payload: paymentMethodName });
    //Saving in to the local storage of the payment method
    localStorage.setItem('paymentMethod', paymentMethodName);
    //Navigate to the placeorder screen
    navigate('/placeorder');
  }

  //User Interface for the Payment Method Sccreen.
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Paypal"
              label="Paypal"
              value="Paypal"
              checked={paymentMethodName === 'Paypal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
