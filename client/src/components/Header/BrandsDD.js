import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";

const CategoriesDD = () => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handleToggle = (filterObject) => {
    // dispatch(singleFilter(filterObject));
    setOpenMenu(false);
  };
  const [companies, setCompanies] = useState(null);
  useEffect(() => {
    fetch("/companies")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCompanies(data.data);
      });
  }, []);

  return companies ? (
    <Dropdown
      title="Brands"
      toggleMenu={() => toggleMenu()}
      openMenu={openMenu}
    >
      {companies.map((company) => {
        return (
          <DropdownLink to={`/category/${company.name}`}>
            {company.name}
          </DropdownLink>
        );
      })}
    </Dropdown>
  ) : (
    <Dropdown title="" />
  );
};

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

export default CategoriesDD;
