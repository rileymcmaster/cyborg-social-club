import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { GiFlexibleLamp, GiRobotAntennas } from "react-icons/gi";
import Dropdown from "./Dropdown";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <Wrapper>
      {/* <Link to={"/"}> */}
      <Logo>
        <GiRobotAntennas />
      </Logo>
      <h1>Cyborg Social Club</h1>
      {/* </Link> */}
      <input type="text" placeholder="Search" />
      {/* CATEGORIES */}
      <Dropdown />
      {/* <DropdownWrapper>
        <Menu onClick={() => toggleMenu()}>Categories</Menu>
        {openMenu ? (
          <DropdownMenu>
            <DropdownLink to={"/"}>Link 1</DropdownLink>
            <DropdownLink to={"/"}>Link 2</DropdownLink>
            <DropdownLink to={"/"}>Link 3</DropdownLink>
            <DropdownLink to={"/"}>Link 4</DropdownLink>
          </DropdownMenu>
        ) : (
          <></>
        )}
      </DropdownWrapper> */}
    </Wrapper>
  );
};

// const Menu = styled.button`
//   text-decoration: none;
//   outline: none;
//   border: 2px solid white;
//   width: 150px;
//   height: 50px;
//   color: black;
//   background-color: transparent;
// `;

// const DropdownLink = styled(NavLink)`
//   /* padding: 20px; */
//   text-align: center;
//   padding: 10px 0;
//   width: 100%;
//   text-decoration: none;
//   color: black;
//   &:hover {
//     color: blue;
//     background-color: orange;
//   }
// `;

// const DropdownMenu = styled.div`
//   width: 100%;
//   /* background-color: black; */
//   position: absolute;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-start;
// `;

// const DropdownWrapper = styled.div`
//   position: relative;
//   display: inline-block;
// `;

const Logo = styled.div`
  font-size: 3rem;
  margin: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  width: 100%;
  align-items: center;
  /* height: var(--header-height); */
  height: 100px;
  background-color: var(--primary-color);
  padding: 20px;
`;

export default Header;
