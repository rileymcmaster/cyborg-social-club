import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { useSelector } from "react-redux";

const ShoppingCartIcon = () => {
  //GET STATE OF ## of items in cart
  const cartState = useSelector((state) => Object.values(state.cart));
  const NumItems = cartState.length;

  return (
    <Logo>
      {NumItems > 0 ? (
        <NumAlert>
          <Number>{NumItems}</Number>
        </NumAlert>
      ) : (
        <></>
      )}
      <Cart>
        <GiShoppingCart />
      </Cart>
    </Logo>
  );
};

const Cart = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  vertical-align: center;
  text-align: center;
  justify-content: center;
  z-index: 1;
  /* align-items: flex-end; */
  top: 5px;
  &:active {
    transform: scale(0.8);
    opacity: 50%;
  }
`;

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
  z-index: 999;
`;

const Logo = styled.div`
  position: relative;

  font-size: 3rem;
  margin: 10px;
  /* padding: auto; */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  color: var(--primary-color);
  &:hover {
    color: var(--secondary-color);
    background-color: var(--primary-color);
  }
`;
export default ShoppingCartIcon;
