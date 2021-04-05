import React from "react";
import styled from "styled-components";
import Button from "../Button";
import { Link } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { useMediaQuery } from "../../components/useMediaQuery";

const PUBLIC_KEY =
  "pk_test_51IcC3GDgvXmdvLhUqpJcHvZAycGlqNajSZNx9fVeCqV33UK4hAXCY1gvNvAfsn909PEwipP4bC84UDkXRUIdnM1I00ugdQXllH";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Form = () => {
  let isPageWide = useMediaQuery("(min-width: 900px)");

  return isPageWide ? (
    <>
      <Body>
        <EntireForm>
          <h1 style={{ "font-size": "22px", color: "black" }}>Checkout</h1>

          <div style={{ width: "100%" }}>
            <Elements stripe={stripeTestPromise} style={{ width: "100%" }}>
              <PaymentForm style={{ width: "100%" }} />
            </Elements>
          </div>

          <SubmitContainer>
            <Link to="/products"> Return Shopping</Link>
          </SubmitContainer>
        </EntireForm>
        <ReviewContainer>
          <ItemReview>
            <span>
              <img src="" alt="product" />
              <h3>productName</h3>
            </span>
            <h4>40$</h4>
          </ItemReview>
          <SubtotalContainer>
            <span>
              <h4>Subtotal </h4>
              <h4>40$ </h4>
            </span>
            <span>
              <h4>Shipping </h4>
              <h4>Free </h4>
            </span>
          </SubtotalContainer>
          <TotalsReview>
            <h2>Total </h2>
            <h2>CAD 40$</h2>
          </TotalsReview>
        </ReviewContainer>
      </Body>
    </>
  ) : (
    //MOBILE
    <Body style={{ flexDirection: "column" }}>
      <EntireForm style={{ width: "100%" }}>
        <h1 style={{ "font-size": "22px", color: "black" }}>Checkout</h1>

        <div style={{ width: "100%" }}>
          <Elements stripe={stripeTestPromise} style={{ width: "100%" }}>
            <PaymentForm style={{ width: "100%" }} />
          </Elements>
        </div>

        <SubmitContainer>
          <Link to="/products"> Return Shopping</Link>
        </SubmitContainer>
      </EntireForm>
      <ReviewContainer style={{ width: "100%" }}>
        <ItemReview>
          <span>
            <img src="" alt="product" />
            <h3>productName</h3>
          </span>
          <h4>40$</h4>
        </ItemReview>
        <SubtotalContainer>
          <span>
            <h4>Subtotal </h4>
            <h4>40$ </h4>
          </span>
          <span>
            <h4>Shipping </h4>
            <h4>Free </h4>
          </span>
        </SubtotalContainer>
        <TotalsReview>
          <h2>Total </h2>
          <h2>CAD 40$</h2>
        </TotalsReview>
      </ReviewContainer>
    </Body>
  );
};

const Body = styled.div`
  display: flex;
`;

const EntireForm = styled.div`
  padding: 3em;

  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-right: 1px solid rgb(0 0 0 / 4%);
  box-shadow: inset -1px -4px 10px 3px rgb(0 0 0 / 8%);

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
    width: 100%;
  }
`;

const FormContainer = styled.form`
  display: flex;
  padding: 2em;
  width: 90%;

  input {
    height: 50px;
    margin-top: 4px;
    margin-right: 3px;
    margin-bottom: 4px;
    width: 100%;
    border: none;
    border-bottom: 1px solid lightgray;
  }
`;

const SubmitContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: white;
`;

const SubtotalContainer = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 15px 0px 15px;
  width: 75%;
  span {
    display: flex;
    justify-content: space-between;
    margin: 10px;
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  width: 50%;
  height: 40vh;
`;

const ItemReview = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  width: 75%;
  justify-content: space-between;
  padding: 15px 0px 15px;

  img {
    width: 80px;
    height: 80px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 7px;
    margin-right: 10px;
  }
  span {
    display: flex;
  }
`;
const TotalsReview = styled.div`
  width: 75%;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding-top: 15px;
`;

const CouponCode = styled.div`
  display: flex;
  width: 75%;

  input {
    height: 50px;
    border: none;
    max-width: 90%;
    margin-top: 4px;
    margin-right: 3px;
    margin-bottom: 4px;
    width: 100%;
  }
`;
export default Form;
