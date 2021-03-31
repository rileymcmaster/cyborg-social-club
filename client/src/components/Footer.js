import React, { useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaBowlingBall } from "react-icons/fa";
import Button from "./Button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Wrapper>
      {/* This is only helpful on the product page, might not need this in the end! */}
      <FooterLinks>
        <Button onClick={scrollToTop}>Back to top</Button>
        <NavigationLink to={"/contact"}>Contact</NavigationLink>
        <NavigationLink to={"/about"}>About</NavigationLink>
        <NavigationLink to={"/legal"}>Legal</NavigationLink>
      </FooterLinks>
      <Socials>
        <a target="blank" href={"https://www.facebook.com/cyborgsc"}>
          <FaTwitter />
        </a>
        <a target="blank" href={"https://www.twitter.com/cyborgsCanada"}>
          <FaFacebookF />
        </a>
        <a target="blank" href={"https://quillesgplus.com/"}>
          <FaBowlingBall />
        </a>
      </Socials>
    </Wrapper>
  );
};
const FooterLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  /* background-color: white; */
`;
const Socials = styled.div`
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 20%;
  a {
    color: var(--primary-color);
    padding: 10px;
    border-radius: 50%;
    &:hover {
      color: var(--secondary-color);
      background-color: var(--primary-color);
    }
  }
`;

const BackToTop = styled.button``;

const NavigationLink = styled(NavLink)`
  color: var(--primary-color);
  text-decoration: none;
  padding: 20px 30px;
  border-radius: 5px;
  &:hover {
    color: var(--secondary-color);
    background-color: var(--primary-color);
  }
`;

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
