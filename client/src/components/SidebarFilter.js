import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

const SidebarFilter = () => {
  return (
    <Wrapper>
      <Title>CATEGORY</Title>
      <EachInput to={`/category/fitness`}>Fitness</EachInput>
      <EachInput to={`/category/medical`}>Medical</EachInput>
      <EachInput to={`/category/lifestyle`}>Lifestyle</EachInput>
      <EachInput to={`/category/entertainment`}>Entertainment</EachInput>
      <EachInput to={`/category/industrial`}>Industrial</EachInput>
      <EachInput to={`category/PetsandAnimals`}>Pets and Animals</EachInput>
      <EachInput to={`category/gaming`}>Gaming</EachInput>
      <Title>PARTS</Title>
      <EachInput to={`category/Arms`}>Arms</EachInput>
      <EachInput to={`category/chest`}>Chest</EachInput>
      <EachInput to={`category/feet`}>Feet</EachInput>
      <EachInput to={`category/hands`}>Hands</EachInput>
      <EachInput to={`category/head`}>Head</EachInput>
      <EachInput to={`category/neck`}>Neck</EachInput>
      <EachInput to={`category/torso`}>Torso</EachInput>
      <EachInput to={`category/waist`}>Waist</EachInput>
      <EachInput to={`category/wrist`}>Wrist</EachInput>
    </Wrapper>
  );
};
const Title = styled.h2`
  background-color: var(--secondary-color);
  color: var(--primary-color);
  padding: 10px 5px 10px 20px;
  &:first-child {
    /* border-top-left-radius: 10px; */
    border-top-right-radius: 10px;
  }
`;
const EachInput = styled(NavLink)`
  font-weight: 600;
  padding: 10px 20px 10px 20px;
  text-decoration: none;
  color: var(--primary-color);
  &:hover {
    background-color: var(--primary-color);
    color: var(--secondary-color);
  }
  &:active {
    color: white;
    box-shadow: 0 0 5px black inset, 2px 2px 10px var(--primary-color);
  }
`;
const Wrapper = styled.div`
  /* height: 800px; */
  padding-bottom: 20px;
  /* width: 200px; */
  display: flex;
  flex-direction: column;
  background-color: rgba(200, 200, 200, 0.2);
  border-radius: 20px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

export default SidebarFilter;
