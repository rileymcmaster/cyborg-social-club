import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";

const CategoriesDD = () => {
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
    <Dropdown title="Brands">
      {companies.map((company) => {
        return <DropdownLink to={"/"}>{company.name}</DropdownLink>;
      })}
      {/* FIGURE OUT THE BRAND LAYOUT HERE */}
      {/* choose a couple brands with the most products and show their logo? */}
      {/* <DropdownLink to={"/"}>Link 1</DropdownLink> */}
      {/* <DropdownLink to={"/"}>Link 2</DropdownLink> */}
      {/* <DropdownLink to={"/"}>Link 3</DropdownLink> */}
      {/* <DropdownLink to={"/"}>Link 4</DropdownLink> */}
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
