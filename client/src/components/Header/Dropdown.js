import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

const Dropdown = ({ title, children, toggleMenu, openMenu }) => {
  // const [openMenu, setOpenMenu] = useState(false);
  // const toggleMenu = () => {
  //   setOpenMenu(!openMenu);
  // };

  return (
    <DropdownWrapper onMouseLeave={toggleMenu}>
      <Menu onMouseOver={toggleMenu}>{title}</Menu>
      {openMenu ? <DropdownMenu>{children}</DropdownMenu> : <></>}
    </DropdownWrapper>
  );
};

const Menu = styled.button`
  text-decoration: none;
  outline: none;
  border: 2px solid;
  border-color: (--primary-color);
  width: 150px;
  height: 50px;
  color: var(--primary-color);
  background-color: var(--secondary-color);
  &:hover {
    /* border-color: (--accent-bg-color); */
    color: var(--secondary-color);
    background-color: var(--primary-color);
  }
`;

const DropdownMenu = styled.div`
  width: 100%;
  max-height: 500px;
  overflow-y: auto;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 10px;
  z-index: 99999;
`;

export default Dropdown;
