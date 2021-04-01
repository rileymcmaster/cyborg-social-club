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
      <NavigationLink to={"/"}>
        <Title>
          <Logo>
            <GiRobotAntennas />
          </Logo>
          <h1>Cyborg Social Club</h1>
        </Title>
      </NavigationLink>
      <SearchBar />

      {/* DROPDOWN MENUS */}
      <CategoriesDD />
      <BodyPartsDD />
      <BrandsDD />

      {/* SIGNUP OR LOGIN */}
      {/* NEED STATE TO DETERMINE IF IT IS LOGIN OR WELCOME */}
      <NavigationLink to={"/"}>
        <CurrentUser />
      </NavigationLink>
      {/* SHOPPING CART */}
      <NavigationLink to={"/cart"}>
        <ShoppingCartIcon />
      </NavigationLink>
    </Wrapper>
  );
};

const NavigationLink = styled(NavLink)`
  color: black;
  text-decoration: none;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 3rem;
  margin: 10px;
  color: var(--primary-color);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  /* height: var(--header-height); */
  padding: 20px;
  align-items: center;
  background-color: var(--secondary-color);
`;

export default Header;
