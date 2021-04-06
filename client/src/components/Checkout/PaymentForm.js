import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import styled from "styled-components";
import Button from "../Button";
import { useSelector } from "react-redux";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "green",
      color: "#000",
      fontWeight: 500,
      fontFamily: "inherit",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "green",
      },
      "::placeholder": {
        color: "gray",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => (
  <FormRow>
    <FormRowLabel htmlFor={id}>{label}</FormRowLabel>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </FormRow>
);

const PaymentForm = ({ totalPrice }) => {
  const cart = useSelector((state) => state.cart);

  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      method: "POST",
      body: JSON.stringify({
        firstName: orderDetails.firstName,
        lastName: orderDetails.lastName,
        email: billingDetails.email,
        phone: billingDetails.phone,
        shippingAddress: {
          street: orderDetails.line1,
          unit: orderDetails.line2,
          city: orderDetails.city,
          province: orderDetails.province,
          country: orderDetails.country,
          postal_code: orderDetails.postal_code,
        },
        order: {
          total: totalPrice,
          items: {
            cart: cart,
          },
        },
      }),
    };
    fetch("/order", requestOptions)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        return json;
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [success && paymentMethod && paymentMethod.length !== 0]);
  console.log(totalPrice);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    phone: "",
    name: "",
  });

  const [orderDetails, setOrderDetails] = useState({
    firstName: "",
    lastName: "",
    line1: "",
    line2: "",
    city: "",
    Province: "",
    country: "",
    postal_code: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (error) {
      elements.getElement("card").focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });

    if (!payload.error) {
      const { id } = payload.paymentMethod;

      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        method: "POST",
        body: JSON.stringify({
          amount: `${totalPrice * 100}`,
          id,
          billingDetails,
        }),
      };

      console.log(Number(totalPrice) * 100);
      try {
        setPaymentMethod(payload.paymentMethod);
        const response = await fetch("/payment", requestOptions);
        console.log(response);

        if (response.status === 200) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      // console.log(error.message);
      setError(payload.error);
    }

    setProcessing(false);
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      email: "",
      phone: "",
      name: "",
    });
  };

  return paymentMethod ? (
    <Result>
      <h2 role="alert">Payment successful</h2>
      <p>Thanks for your order. It will arrive in 4 business days.</p>
      <Button type="button" onClick={reset}>
        <svg width="32px" height="32px" viewBox="0 0 32 32">
          <path
            fill="#FFF"
            d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
          />
        </svg>
      </Button>
      );
    </Result>
  ) : (
    <Form onSubmit={handleSubmit}>
      <h2>Shipping Information</h2>
      <FormGroup>
        <Field
          label="firstname"
          id="firstname"
          type="text"
          placeholder="First Name"
          required
          autoComplete="given-name"
          value={orderDetails.firstname}
          onChange={(e) => {
            setOrderDetails({ ...orderDetails, firstName: e.target.value });
          }}
        />
        <Field
          label="lastname"
          id="lastname"
          type="text"
          placeholder="Last Name"
          required
          autoComplete="family-name"
          value={orderDetails.lastname}
          onChange={(e) => {
            setOrderDetails({ ...orderDetails, lastName: e.target.value });
          }}
        />
        <Field
          label="shippingaddress"
          id="shippingaddresssline1"
          type="address"
          placeholder="Address"
          required
          autoComplete="address-line1"
          value={orderDetails.line1}
          onChange={(e) => {
            setOrderDetails({ ...orderDetails, line1: e.target.value });
          }}
        />
        <Field
          label="shippingaddress"
          id="shippingaddresssline2"
          type="address"
          placeholder="Apartment, suite, etc. (optional)"
          required
          autoComplete="address-line2"
          value={orderDetails.line2}
          onChange={(e) => {
            setOrderDetails({ ...orderDetails, line2: e.target.value });
          }}
        />
        <Field
          label="shippingaddress"
          id="shippingaddressscity"
          type="address"
          placeholder="City"
          required
          autoComplete="address-level2"
          value={orderDetails.city}
          onChange={(e) => {
            setOrderDetails({ ...orderDetails, city: e.target.value });
          }}
        />
        <Field
          label="shippingaddress"
          id="shippingaddresssprovince"
          type="address"
          placeholder="Province"
          required
          autoComplete="address-level1"
          value={orderDetails.province}
          onChange={(e) => {
            setOrderDetails({
              ...orderDetails,
              province: e.target.value,
            });
          }}
        />
        <Field
          label="shippingaddress"
          id="shippingaddressscountry"
          type="address"
          placeholder="Country"
          required
          autoComplete="country"
          value={orderDetails.country}
          onChange={(e) => {
            setOrderDetails({
              ...orderDetails,
              country: e.target.value,
            });
          }}
        />
        <Field
          label="shippingaddress"
          id="shippingaddressspostalcode"
          type="address"
          placeholder="Postal Code"
          required
          autoComplete="postal-code"
          value={orderDetails.postal_code}
          onChange={(e) => {
            setOrderDetails({
              ...orderDetails,
              postal_code: e.target.value,
            });
          }}
        />
        <h2 style={{ margin: "6em 0 2em", "text-align": "center" }}>Payment</h2>
        <Field
          label="cardholdername"
          id="cardholdername"
          type="text"
          placeholder="Cardholder's Name"
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />
        <Field
          label="Email"
          id="email"
          type="email"
          placeholder="Email"
          required
          autoComplete="email"
          value={billingDetails.email}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, email: e.target.value });
          }}
        />
        <Field
          label="Phone"
          id="phone"
          type="tel"
          placeholder="Phone Number"
          required
          autoComplete="tel"
          value={billingDetails.phone}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, phone: e.target.value });
          }}
        />
      </FormGroup>
      <FormGroup>
        <FormRow>
          <CardElement
            options={CARD_OPTIONS}
            onChange={(e) => {
              setError(e.error);
              setCardComplete(e.complete);
            }}
          />
        </FormRow>
      </FormGroup>
      {error && (
        <ErrorMessage role="alert">
          <svg width="16" height="16" viewBox="0 0 17 17">
            <path
              fill="#FFF"
              d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
            />
            <path
              fill="#6772e5"
              d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
            />
          </svg>
          {error.message}
        </ErrorMessage>
      )}

      <Button type="submit" disabled={processing || !stripe}>
        {processing ? "Processing..." : "Pay $20"}
      </Button>
    </Form>
  );
};

const Form = styled.form`
  animation: fade 200ms ease-out;
`;

const FormRow = styled.div`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  border-bottom: 1px solid lightgray;
  margin: 1em 0;

  .StripeElement {
    width: 100%;
    padding: 11px 15px 11px 0;
  }

  input {
    font-size: 16px;
    width: 100%;
    padding: 11px 15px 11px 0;
    background-color: transparent;
    border: none;
    animation: 1ms void-animation-out;
  }

  input::placeholder {
    color: gray;
    padding-left: 2em;
  }
`;

const FormRowLabel = styled.label`
  visibility: hidden;
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

const FormGroup = styled.fieldset`
  margin: 0 15px 20px;
  border-style: none;
  will-change: opacity, transform;
  border-radius: 4px;
  width: 90%;
`;

const ErrorMessage = styled.div``;

const Result = styled.div`
  margin-top: 50px;
  text-align: center;
  animation: fade 200ms ease-out;
`;
export default PaymentForm;
