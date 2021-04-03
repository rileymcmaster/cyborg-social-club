import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { filters } from "./Filters";
import Button from "./Button";

const SidebarFilter = ({ checked, setChecked, setCurrentPage }) => {
  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  //   console.log("checked", checked);
  return (
    <Wrapper>
      <Title>CATEGORY</Title>
      {filters.map((filter, index) => {
        if (filter.kind === "category") {
          return (
            <>
              <EachInput key={index}>
                <input
                  onClick={() => handleToggle(filter)}
                  type="checkbox"
                  name="filter"
                  value={filter.name}
                />

                <label for={filter.name}>{filter.name}</label>
              </EachInput>
            </>
          );
        }
      })}
      <Title>Parts</Title>
      {filters.map((filter, index) => {
        if (filter.kind === "parts") {
          return (
            <EachInput key={index}>
              <input
                onClick={() => handleToggle(filter)}
                type="checkbox"
                name="filter"
                value={filter.name}
                defaultChecked={false}
              />
              <label for="filter"> {filter.name}</label>
            </EachInput>
          );
        }
      })}
      {/* This doesn't clear the checkboxes but it works */}
      <Button
        onClick={() => {
          setChecked([]);
        }}
      >
        Clear
      </Button>
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
const EachInput = styled.div`
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
