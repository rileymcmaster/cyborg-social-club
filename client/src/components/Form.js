import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { Link } from "react-router-dom";

const Form = () => {
  return (
    <Body>
      <EntireForm>
        <header> LOGO</header>
        <h1> Contact information</h1>
        <FormContainer>
          <input type="email" name="email" placeholder="Email" />
        </FormContainer>
        <h1>Shipping address</h1>
        <FormContainer>
          <span>
            <input
              required
              type="text"
              name="first-name"
              placeholder="First Name"
            />
            <input
              required
              type="text"
              name="last-name"
              placeholder="Last Name"
            />
          </span>
          <input required type="address" name="address" placeholder="Address" />
          <input
            type="address"
            name="address-2"
            placeholder="Apartment, suite, etc. (optional)"
          />
          <input required type="city" name="city" placeholder="City" />
          <span>
            <input
              required
              type="country"
              name="country"
              placeholder="Country"
            />

            <input
              required
              type="text"
              name="province"
              placeholder="Province"
            />
            <input
              required
              type="postal"
              name="postal-code"
              placeholder="Postal code"
            />
          </span>
        </FormContainer>
        <h1>Payment</h1>

        <FormContainer>
          <input
            required
            id="ccn"
            type="number"
            min="15"
            inputmode="numeric"
            pattern="[0-9\s]{13,19}"
            autocomplete="cc-number"
            maxlength="19"
            placeholder="Card number"
          />
          <input required type="text" placeholder="Name on card" />
          <span>
            <input
              required
              type="month"
              placeholder="Expiration date (MM/YY)"
            />

            <input required type="number" placeholder="Security code" />
          </span>
        </FormContainer>
        <SubmitContainer>
          <Button>Pay Now</Button>
          <Link to="/products"> Return Shopping</Link>
        </SubmitContainer>
      </EntireForm>
      <ReviewContainer>
        <ItemReview>
          <span>
          <img src="" alt="product"/>
          <h3>productName</h3> 
          </span>
          <h4>40$</h4>  
          </ItemReview>
          <CouponCode>
            <input type="number" placeholder="Coupon Code"/>
            <Button>Apply</Button>
          </CouponCode>
          
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
  border: solid orange;
  background-color: var(--accent-bg-color);
`;

const EntireForm = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 20px;
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 90%;
  background-color: white;

  input {
    height: 50px;
    border-radius: 7px;
    max-width: 90%;
    margin-top: 4px;
    margin-right: 3px;
    margin-bottom: 4px;
    width: 100%;
  }
  span {
    display: flex;
    justify-content: space-evenly;
    min-width: 90%;
  }
`;

const SubmitContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: white;
`;

const SubtotalContainer = styled.div `
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


`

const ItemReview = styled.div `
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



`
const TotalsReview = styled.div `
width: 75%;
display: flex;
justify-content: space-between;
border-top: 1px solid rgba(0, 0, 0, 0.2);
padding-top: 15px;


`

const CouponCode = styled.div `

display: flex;
width: 75%;

 input {
    height: 50px;
    border-radius: 7px;
    max-width: 90%;
    margin-top: 4px;
    margin-right: 3px;
    margin-bottom: 4px;
    width: 100%;
  }
`
export default Form;
