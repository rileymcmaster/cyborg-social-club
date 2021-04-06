import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";
import { filters } from "../Filters";
import { singleFilter } from "../../actions";

//PETS AND ANIMALS IS BROKEN.
//it doesn't like the spaces for some reason
//will come back to it.

const CategoriesDD = () => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleToggle = (filterObject) => {
    dispatch(singleFilter(filterObject));
    setOpenMenu(false);
  };

  //CATEGORIES
  return (
    <Dropdown
      title="Categories"
      toggleMenu={() => toggleMenu()}
      openMenu={openMenu}
    >
      {filters.map((filter, index) => {
        if (filter.kind === "category") {
          return (
            <DropdownLink key={index} onClick={() => handleToggle(filter)}>
              {filter.name}
            </DropdownLink>
          );
        }
        // console.log("FILTER", filter);
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

export default CategoriesDD;
