import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";
import { filters } from "../Filters";
import { singleFilter } from "../../actions";

const BodyPartsDD = () => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handleToggle = (filterObject) => {
    dispatch(singleFilter(filterObject));
    setOpenMenu(false);
  };

  return (
    <Dropdown title="Parts" toggleMenu={() => toggleMenu()} openMenu={openMenu}>
      {filters.map((filter, index) => {
        if (filter.kind === "parts") {
          return (
            <DropdownLink key={index} onClick={() => handleToggle(filter)}>
              {filter.name}
            </DropdownLink>
          );
        }
      })}
    </Dropdown>
  );
};

const DropdownLink = styled.div`
  user-select: none;
  cursor: pointer;
  width: 100%;
  padding: 10px 0;
  text-align: center;
  text-decoration: none;
  color: var(--secondary-color);
  background-color: var(--primary-color);
  border-bottom: 1px solid var(--secondary-color);
  &:hover {
    color: var(--primary-color);
    background-color: var(--secondary-color);
  }
`;

const DropdownMenu = styled.div`
  width: 100%;
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

export default BodyPartsDD;
