import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { filters } from "./Filters";
import { addFilter, removeFilter } from "../actions";

const SidebarFilter = () => {
  const dispatch = useDispatch();
  const filterState = useSelector((state) => state.filter);
  const filterStateKeys = Object.keys(filterState);

  const handleToggle = (value) => {
    if (filterStateKeys.includes(value.name)) {
      dispatch(removeFilter(value));
    } else {
      dispatch(addFilter(value));
    }
  };

  return (
    <Wrapper>
      <Title>CATEGORY</Title>
      {filters.map((filter, index) => {
        if (filter.kind === "category") {
          return (
            <>
              <label for={filter.name}>
                <EachInput key={index}>
                  <input
                    onClick={() => handleToggle(filter)}
                    type="checkbox"
                    name="filter"
                    value={filter.name}
                    id={filter.name}
                    checked={filterStateKeys.includes(filter.name)}
                  />

                  {filter.name}
                </EachInput>
              </label>
            </>
          );
        }
      })}
      <Title>Parts</Title>
      {filters.map((filter, index) => {
        if (filter.kind === "parts") {
          return (
            <label for={filter.name}>
              <EachInput key={index}>
                <input
                  onClick={() => handleToggle(filter)}
                  type="checkbox"
                  name="filter"
                  value={filter.name}
                  id={filter.name}
                  checked={filterStateKeys.includes(filter.name)}
                />
                {filter.name}
              </EachInput>
            </label>
          );
        }
      })}
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
  user-select: none;
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
  /* padding-right: 20px; */
  width: 200px;
  height: 800px;
  display: flex;
  flex-direction: column;
  background-color: rgba(200, 200, 200, 0.2);
  border-radius: 20px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

export default SidebarFilter;
