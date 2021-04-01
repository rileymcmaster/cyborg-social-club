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
            <FiUser />
            <p>
              <NoBreak>Welcome back,</NoBreak>{userState.email}
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
