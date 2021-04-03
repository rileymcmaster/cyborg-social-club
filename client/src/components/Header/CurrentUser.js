import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FiUser } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "../../actions";

const CurrentUser = () => {
  //CHECK GLOBAL STATE IF LOGGED IN???
  const [loggedIn, setLoggedIn] = useState(true);
  const userState = useSelector((state) => state.signin);
  const dispatch = useDispatch();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  ///// Handle Sign out /////
  const state = useSelector((state) => state.signin);
  const emailRef = useRef();
  const passwordRef = useRef();
  console.log(state);

  const handleSignOut = (e) => {
    e.preventDefault();
    let email = state.email;
    let password = state.password;
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    };

    fetch("/user", requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          dispatch(signOut(json.user));
          return;
        } else if (json.status === 404) {
          return window.alert("user does not exist");
        }
      });
  };

  return (
    <Wrapper>
      <Icon>
        {userState.isSignedIn ? (
          <>
            <FiUser />
            <p>
              <NoBreak>Welcome back,</NoBreak>
              {
                (capitalizeFirstLetter(userState.firstName),
                (
                  <Link
                    onClick={handleSignOut}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Sign out
                  </Link>
                ))
              }
            </p>
          </>
        ) : (
          <>
            <FiUser /> <p>Log In</p>
          </>
        )}
      </Icon>
    </Wrapper>
  );
};
const NoBreak = styled.p`
  white-space: nowrap;
`;

const Icon = styled.p`
  user-select: none;
  z-index: 999;
  color: var(--primary-color);
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  & p {
    font-size: 1rem;
  }
  &:hover {
    color: white;
    background-color: var(--primary-color);
    text-shadow: 0 0 1px white;
  }
`;

const Wrapper = styled.div`
  margin: 5px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default CurrentUser;
