import React, {useRef, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {signIn} from "../actions";


const Signin = () => {
  const state = useSelector((state) => state.signin);
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  

  const handleChange = (e) => {
    console.log(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    console.log(password);
    dispatch(signIn(email , password))
  }


  console.log(state);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label for="email">
            <b>Email</b>
          </label>
          <input ref={emailRef} type="email" placeholder="Enter Email" name="email" required onChange={handleChange} />

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

          <button type="submit" onClick="submit">Login</button>
        </div>

        <div>
          <button type="button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
