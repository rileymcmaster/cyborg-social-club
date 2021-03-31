import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <Wrapper>
      <NavLink to={"/"}>Contact</NavLink>
      <NavLink to={"/"}>About</NavLink>
      <NavLink to={"/"}>Legal</NavLink>
      <NavLink to={"/"}>
        <FaTwitter />
      </NavLink>
      <NavLink to={"/"}>
        <FaFacebookF />
      </NavLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  width: 100%;
  height: 100px;
  bottom: 0;
  /* height: var(--header-height); */
  padding: 20px;
  align-items: center;
  background-color: var(--secondary-color);
`;

export default Footer;
