import React from "react";
import styled from "styled-components";
import Button from './Button';

const Form = () => {
  return (
    <div>
      <Container>
        <header> LOGO</header>
        <FormContainer>
          <h1> Contact information</h1>
          <input type="email" name="email" placeholder="Email" />
        </FormContainer>
        <FormContainer>
          <h1>Shipping address</h1>
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

          <form>
            <h1>Payment</h1>
            <div>
              <label for="credit">Credit card</label>
              <input name="credit" type="radio" checked required />
            </div>
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
            <input
              required
              type="month"
              placeholder="Expiration date (MM/YY)"
            />

            <input required type="number" placeholder="Security code" />
          </form>
          <div>
            <Button />
          </div>
        </FormContainer>

      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  border: solid red;
  width: 50%;

  input {
  }
`;

export default Form;
