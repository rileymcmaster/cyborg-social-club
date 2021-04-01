import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";

//PETS AND ANIMALS IS BROKEN.
//it doesn't like the spaces for some reason
//will come back to it.

const CategoriesDD = () => {
  const [items, setItems] = useState(null);
  useEffect(() => {
    fetch("/items")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setItems(data.data.results);
      });
  }, []);

  //FIND UNIQUE CATEGORIES
  let categoriesArray = [];
  if (items) {
    items.map((item) => {
      categoriesArray.push(item.category);
    });
  }
  const onlyUniqueValues = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  const uniqueCategories = categoriesArray.filter(onlyUniqueValues);

  //CATEGORIES
  return items ? (
    <Dropdown title="Categories">
      {uniqueCategories.map((item) => {
        const removeSpaces = item.split(" ").join("");
        return (
          <DropdownLink to={`/category/${removeSpaces}`}>{item}</DropdownLink>
        );
      })}
    </Dropdown>
  ) : (
    <Dropdown title="" />
  );
};

const Menu = styled.button`
  text-decoration: none;
  outline: none;
  border: 2px solid;
  border-color: (--primary-color);
  width: 150px;
  height: 50px;
  color: var(--primary-color);
  background-color: var(--secondary-color);
  &:hover {
    border-color: (--secondary-color);
    color: var(--secondary-color);
    background-color: var(--primary-color);
  }
`;

const DropdownLink = styled(NavLink)`
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

export default CategoriesDD;
