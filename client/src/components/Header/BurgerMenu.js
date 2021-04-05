import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "./SearchBar";

const BurgerMenu = ({ hideMenu }) => {
  const [showCategories, setShowCategories] = useState(false);
  const [showParts, setShowParts] = useState(false);

  return (
    <Wrapper>
      <SearchBar hideMenu={hideMenu} style={{ width: "100%" }} />
      <NavLink style={{ textDecoration: "none" }} onClick={hideMenu} to={"/"}>
        <Category>Home</Category>
      </NavLink>
      {/* CATEGORIES */}
      <Category
        onClick={() => {
          setShowCategories(!showCategories);
          setShowParts(false);
        }}
      >
        Category
      </Category>
      {showCategories ? (
        <CategoryWrapper>
          <NavigationLink onClick={hideMenu} to={"/category/Fitness"}>
            <EachCategory>Fitness</EachCategory>
          </NavigationLink>
          <NavigationLink onClick={hideMenu} to={"/category/Medical"}>
            <EachCategory>Medical</EachCategory>
          </NavigationLink>
          <NavigationLink onClick={hideMenu} to={"/category/Lifestyle"}>
            <EachCategory>Lifestyle</EachCategory>
          </NavigationLink>
          <NavigationLink onClick={hideMenu} to={"/category/Entertainment"}>
            <EachCategory>Entertainment</EachCategory>
          </NavigationLink>
          <NavigationLink onClick={hideMenu} to={"/category/Industrial"}>
            <EachCategory>Industrial</EachCategory>
          </NavigationLink>
          <NavigationLink onClick={hideMenu} to={"/category/PetsandAnimals"}>
            <EachCategory>Pets and Animals</EachCategory>
          </NavigationLink>
          <NavigationLink onClick={hideMenu} to={"/category/Gaming"}>
            <EachCategory>Gaming</EachCategory>
          </NavigationLink>
        </CategoryWrapper>
      ) : (
        <></>
      )}
      {/* PARTS */}
      <Category
        onClick={() => {
          setShowParts(!showParts);
          setShowCategories(false);
        }}
      >
        Parts
      </Category>
      {showParts ? (
        <CategoryWrapper>
          <NavigationLink onClick={hideMenu} to={"/category/Arms"}>
            <EachCategory>Arms</EachCategory>
          </NavigationLink>
          <NavigationLink onClick={hideMenu} to={"/category/Chest"}>
            <EachCategory>Chest</EachCategory>
          </NavigationLink>
          <NavigationLink onClick={hideMenu} to={"/category/Feet"}>
            <EachCategory>Feet</EachCategory>
          </NavigationLink>
          <NavigationLink onClick={hideMenu} to={"/category/Hands"}>
            <EachCategory>Hands</EachCategory>
          </NavigationLink>
          <NavigationLink onClick={hideMenu} to={"/category/Head"}>
            <EachCategory>Head</EachCategory>
          </NavigationLink>
          <NavigationLink onClick={hideMenu} to={"/category/Neck"}>
            <EachCategory>Neck</EachCategory>
          </NavigationLink>
          <NavigationLink onClick={hideMenu} to={"/category/Torso"}>
            <EachCategory>Torso</EachCategory>
          </NavigationLink>
          <NavigationLink onClick={hideMenu} to={"/category/Waist"}>
            <EachCategory>Waist</EachCategory>
          </NavigationLink>
          <NavigationLink onClick={hideMenu} to={"/category/Wrist"}>
            <EachCategory>Wrist</EachCategory>
          </NavigationLink>
        </CategoryWrapper>
      ) : (
        <></>
      )}
    </Wrapper>
  );
};
const NavigationLink = styled(NavLink)`
  text-decoration: none;
`;
const CategoryWrapper = styled.div`
  background-color: var(--primary-color);
  box-shadow: 0px 10px 10px inset black;
`;
const EachCategory = styled.div`
  color: var(--secondary-color);
  padding: 10px;

  margin-left: 40px;
  &:hover {
    color: white;
    text-shadow: 0 0 10px rgba(255, 255, 255, 1);
  }
  &:active {
    color: rgba(255, 255, 255, 0.5);
    text-shadow: none;
  }
`;

const Category = styled.div`
  border-top: 2px solid var(--primary-color);
  color: var(--primary-color);
  height: 100px;
  vertical-align: center;
  text-align: center;
  padding: 20px;
  &:hover {
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background-color: var(--primary-color);
    color: var(--secondary-color);
    border-top: 6px solid var(--secondary-color);
  }
  &:active {
    /* background-color: var(--secondary-color); */
    /* color: var(--seco-color); */
    font-size: 90%;
    box-shadow: 0 0 5px var(--secondary-color) inset;
  }
`;

const Wrapper = styled.h1`
  user-select: none;
  /* position: absolute; */
  display: flex;
  flex-direction: column;
  width: 100vw;
  background-color: var(--secondary-color);
  /* width: 500px; */
  font-size: 3rem;
  z-index: 99999999999999999999999;
  border-bottom: 6px solid black;
`;

export default BurgerMenu;
