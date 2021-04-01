import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../actions";
import styled from "styled-components";
import { useHistory } from "react-router-dom";


const Signin = () => {
  const state = useSelector((state) => state.signin);
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  let history = useHistory();

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {"Content-Type": "application/json"},

    }
    
    fetch("/user", requestOptions ).then((res)=> res.json()).then((json)=> {
      if (json.status === 200) {
        dispatch(signIn(json.user))
        return history.push("/products");
      } else if (json.status === 404) {
        return window.alert("user does not exist");
      }


      
    })
    
  };

  console.log(state);
  return (
    <Container>
      <form onSubmit={handleSubmit}>
          <label for="email">
            <b>Email</b>
          </label>
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter Email"
            name="email"
            required
            onChange={handleChange}
          />

          <label for="password">
            <b>Password</b>
          </label>
          <input
            ref={passwordRef}
            type="password"
            onChange={handleChange}
            placeholder="Enter Password"
            name="password"
            required
          />

         

        <div>
        <button type="submit" onClick="submit">
            Login
          </button>
          <button type="button">Cancel</button>
        </div>
      </form>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 80vh;

  form {
    border: solid red;
    height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
  }

  input{ 
    height: 50px;
    border-radius: 7px;
    max-width: 90%;
    margin-top: 4px;
    margin-right: 3px;
    margin-bottom: 4px;
    min-width: 250px;
    max-width: 400px;
  }
`;

export default Signin;
