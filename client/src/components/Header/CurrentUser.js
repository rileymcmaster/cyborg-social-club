import React, { useState } from "react";
import styled from "styled-components";
import { FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";

const CurrentUser = () => {
  //CHECK GLOBAL STATE IF LOGGED IN???
  const [loggedIn, setLoggedIn] = useState(true);
  const userState = useSelector((state) => state.signin);
  console.log(userState);

  return (
    <Wrapper>
      <Icon>
        {userState.isSignedIn ? (
          <>
            <FiUser /> <p>Welcome back, {userState.email} </p>
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

const Icon = styled.div`
  color: white;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 120px;
  & p {
    font-size: 1rem;
  }
`;

const Wrapper = styled.div`
  margin: 5px;
`;
export default CurrentUser;
