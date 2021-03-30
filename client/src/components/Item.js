import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../actions";
import styled from "styled-components";
import Button from "./Button";

const Item = ({ id, name, price, imageSrc }) => {
  return (
    <ItemWrapper>
      <ImgDiv>
        <ItemImg src={imageSrc} />
      </ImgDiv>
      <ItemName>{name}</ItemName>
      <ItemPrice>{price}</ItemPrice>
      <Button>Add to Cart</Button>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  width: 20vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  margin: 20px;
`;

const ImgDiv = styled.div`
  /* border: solid 1px var(--primary-color); */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 50%;
  overflow: hidden;
`;

const ItemImg = styled.img`
  /* padding: 20px; */
`;
const ItemName = styled.h1`
  padding: 20px;
  color: var(--primary-color);

  text-align: center;
`;
const ItemPrice = styled.p`
  font-size: 15px;
`;

export default Item;
