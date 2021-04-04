import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../actions";
import styled from "styled-components";
import { Redirect, useHistory } from "react-router-dom";
import Button from "./Button";
import { Link } from "react-router-dom";
import { GiEdgeCrack, GiRobotAntennas, GiWhiteBook } from "react-icons/gi";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { FiAlertTriangle } from "react-icons/fi";

const Signin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  let history = useHistory();
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    };

    fetch("/user", requestOptions)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (
          json.status === 200 &&
          json.user.email === email &&
          json.user.password === password
        ) {
          dispatch(signIn(json.user));
          return history.push("/products");
        } else if (
          (json.status === 200 && json.user.email != email) ||
          json?.user?.password != password
        ) {
          setPasswordError(true);
          return;
        } else if (json.status === 404) {
          setPasswordError(true);
        }
      });
  };

  return (
    <Container>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <AuthErrorMsg
            style={
              passwordError === true
                ? { border: " solid red ", borderRadius: "7px" }
                : { backgroundColor: "white" }
            }
          >
            {passwordError === false ? (
              <span>
                <p></p>
              </span>
            ) : (
              <span>
                <ErrorMessage style={{ color: "white" }}>
                  <FiAlertTriangle style={{ height: "40px", width: "40px" }} />
                </ErrorMessage>
                <p>
                  {" "}
                  Sorry, the e-mail address and password you entered don’t
                  match. Please try again.
                </p>
              </span>
            )}
          </AuthErrorMsg>
          <label for="email">
            <b>Email</b>
          </label>
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter Email"
            name="email"
            required
            maxlength="50"
          />

          <label for="password">
            <b>Password</b>
          </label>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Enter Password"
            name="password"
            maxlength="40"
            required
          />

          <ButtonContainer>
            <Button type="submit" onClick="submit" style={{ marginTop: "5px" }}>
              Login
            </Button>
            <Link
              style={{ textDecoration: "none", color: "var(--primary-color)" }}
            >
              Forgot password?
            </Link>
          </ButtonContainer>
        </form>
      </div>
      <SignUpContainer>
        <Logo>
          <GiRobotAntennas />
        </Logo>
        <h2> Don't have an account?</h2>
        <p>Here are some of the benefits you’ll enjoy:</p>
        <h3>Exclusive Deals</h3>
        <p>Be first to know about new products and specials. </p>
        <h3>Free Shipping</h3>
        <p>Enjoy free shipping on orders over $99. </p>

        <h3>Cyborg Points Program</h3>
        <p>Get 1 Reward point per dollar spent with every purchse.</p>
        <CreateAccLink to="/sign-up">
          Create an account <HiOutlineArrowCircleRight />{" "}
        </CreateAccLink>
      </SignUpContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 83vh;
  justify-content: center;
  align-items: center;

  form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  input {
    height: 50px;
    border-radius: 7px;
    max-width: 90%;
    margin-top: 4px;
    margin-right: 3px;
    margin-bottom: 4px;
    min-width: 380px;
  }
  h1 {
    margin-bottom: 40px;
    font-size: 50px;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-width: 400px;
  max-width: 400px;
`;

const SignUpContainer = styled.div`
  margin-left: 10%;
  width: 40%;
  max-width: 40%;
  height: 600px;
  border: var(--primary-color) solid 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    color: var(--secondary-color);
    padding: 30px;
    font-size: 40px;
  }
  h3,
  p {
    padding: 10px;
  }
  h3 {
    color: var(--prim-color);
    font-size: 20px;
  }
`;
const Logo = styled.div`
  font-size: 5rem;
  margin: 10px;
  color: var(--primary-color);
`;

const CreateAccLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--primary-color);
  font-size: 20px;
  font-weight: 800;
  margin-top: 20px;

  &:hover {
    border-bottom: solid 3px var(--primary-color);
  }
`;

const AuthErrorMsg = styled.div`
  display: flex;

  min-width: 380px;
  max-width: 70%;
  min-height: 80px;
  max-height: 80px;
  margin-bottom: 10px;
  color: var(--secondary-color);
  text-align: center;

  span {
    display: flex;
    align-items: center;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  color: white;
  width: 20%;
  height: 100%;
  background-color: red;
  align-items: center;
  justify-content: center;
`;

export default Signin;
