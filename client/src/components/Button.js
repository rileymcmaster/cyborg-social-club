import React from "react";
import styled from "styled-components";

const Button = styled.button`
  text-decoration: none;
  outline: none;
  border: 2px solid;
  border-color: (--primary-color);
  width: 150px;
  height: 50px;
  color: var(--primary-color);
  background-color: var(--secondary-color);
  &:hover {
    /* border-color: (--accent-bg-color); */
    color: var(--secondary-color);
    background-color: var(--primary-color);
  }
`;

export default Button;
