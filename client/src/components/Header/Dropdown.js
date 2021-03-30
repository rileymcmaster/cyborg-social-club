import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

const Dropdown = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <DropdownWrapper>
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
    </DropdownWrapper>
  );
};

const Menu = styled.button`
  text-decoration: none;
  outline: none;
  border: 2px solid black;
  width: 150px;
  height: 50px;
  color: black;
  background-color: transparent;
  &:hover {
  }
`;

const DropdownLink = styled(NavLink)`
  /* padding: 20px; */
  text-align: center;
  padding: 10px 0;
  width: 100%;
  text-decoration: none;
  color: black;
  &:hover {
    color: blue;
    background-color: orange;
  }
`;

const DropdownMenu = styled.div`
  width: 100%;
  /* background-color: black; */
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export default Dropdown;
