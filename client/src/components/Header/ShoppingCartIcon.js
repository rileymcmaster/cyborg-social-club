import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";

const ShoppingCartIcon = () => {
  //GET STATE OF ## of items in cart

  const NumItems = 4;

  return (
    //   <NavLink to={"/"}>
    <Logo>
      {NumItems > 0 ? (
        <NumAlert>
          <Number>{NumItems}</Number>
        </NumAlert>
      ) : (
        <></>
      )}
      <GiShoppingCart />
    </Logo>
    //   {/* </NavLink> */}
  );
};

const Number = styled.p`
  position: relative;
  text-align: center;
  vertical-align: center;
  color: white;
  margin-top: 3px;
  font-size: 1rem;
  text-shadow: 0 0 1px black;
`;

const NumAlert = styled.div`
  pointer-events: none;
  position: absolute;
  right: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(255, 0, 0, 0.9);
  box-shadow: 1px 1px 2px black;
`;

const Logo = styled.div`
  position: relative;
  /* display: flex; */
  font-size: 3rem;
  margin: 10px;
`;
export default ShoppingCartIcon;
