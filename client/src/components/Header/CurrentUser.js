import React, { useState } from "react";
import styled from "styled-components";
import { FiUser } from "react-icons/fi";

const CurrentUser = () => {
  //CHECK GLOBAL STATE IF LOGGED IN???
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Wrapper>
      <Icon>
        {loggedIn ? (
          <>
            <FiUser /> <p>Welcome back, ~username~ </p>
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
