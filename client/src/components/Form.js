import React from "react";
import styled from "styled-components";

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
            <input type="text" name="first-name" placeholder="First Name" />
            <input type="text" name="last-name" placeholder="Last Name" />
          </span>
          <input type="address" name="address" placeholder="Address" />
          <input
            type="address"
            name="address-2"
            placeholder="Apartment, suite, etc. (optional)"
          />
          <input type="city" name="city" placeholder="City" />
          <span>
            <input type="country" name="country" placeholder="Country" />

            <input type="text" name="province" placeholder="Province" />
            <input type="postal" name="postal-code" placeholder="Postal code" />
          </span>
        </FormContainer>
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

`;

const FormContainer = styled.form `
display: flex;
flex-direction: column;
border: solid red;
width: 50%;

input{

}

`

export default Form;
