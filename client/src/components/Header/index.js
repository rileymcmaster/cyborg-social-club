import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { GiRobotAntennas, GiShoppingCart } from "react-icons/gi";
import CategoriesDD from "./CategoriesDD";
import BrandsDD from "./BrandsDD";
import ShoppingCartIcon from "./ShoppingCartIcon";
import SearchBar from "./SearchBar";
import BodyPartsDD from "./BodyPartsDD";
import CurrentUser from "./CurrentUser";

const Header = () => {
  return (
    <Wrapper>
      {/* <NavLink to={"/"}> */}
      <Logo>
        <GiRobotAntennas />
      </Logo>
      <h1>Cyborg Social Club</h1>
      {/* </NavLink> */}
      <SearchBar />

      {/* DROPDOWN MENUS */}
      <CategoriesDD />
      <BodyPartsDD />
      <BrandsDD />

      {/* SIGNUP OR LOGIN */}
      <CurrentUser />
      {/* SHOPPING CART */}
      <ShoppingCartIcon />
    </Wrapper>
  );
};

const Logo = styled.div`
  font-size: 3rem;
  margin: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  /* height: var(--header-height); */
  padding: 20px;
  align-items: center;
  background-color: var(--secondary-color);
`;

export default Header;
