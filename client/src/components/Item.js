import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../actions";
import styled from "styled-components";

const Item = ({ id, name, price, imageSrc }) => {
  // const dispatch = useDispatch();
  return (
    <ItemWrapper>
      <div>{name}</div>
      <div>{price}</div>
      <img src={imageSrc} />
    </ItemWrapper>
  );
};

const ItemWrapper = styled.li``;

export default Item;
