import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../actions";
import styled from "styled-components";
import Button from "./Button";
import { Link } from "react-router-dom";

const ProductGridItem = ({ id, name, price, imageSrc }) => {
  const productFound = true;

  return (
    <>
      {productFound ? (
        <ItemWrapper>
          <StyledLink to={`/item/${id}`}>
            <ImgDiv>
              <ItemImg src={imageSrc} />
            </ImgDiv>
            <ItemName>{name}</ItemName>
            <ItemPrice>{price}</ItemPrice>
          </StyledLink>
          <Button>Add to Cart</Button>
        </ItemWrapper>
      ) : (
        <p>Product Not Found</p>
      )}
    </>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--primary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20vw;
  height: 50vh;
`;

const ItemWrapper = styled.div`
  width: 300px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 20px;
  border: solid 1px lightgrey;
`;

const ImgDiv = styled.div`
  /* border: solid 1px var(--primary-color); */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 50%;
  overflow: hidden;
`;

const ItemImg = styled.img`
  /* padding: 20px; */
`;
const ItemName = styled.h1`
  color: var(--primary-color);
  text-align: center;
  width: 250px;
  margin-top: 10px;
`;

const ItemPrice = styled.p`
  color: var(--secondary-color);
  font-size: 15px;
  margin-top: 10px;
`;

export default ProductGridItem;
