import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../actions";
import styled from "styled-components";
import Button from "./Button";
import { Link } from "react-router-dom";

const ProductGridItem = ({ items, id, name, price, imageSrc }) => {
  //need to see if any of the Id's match the id
  //
  // const productFound = items.some((item) => {
  //   return item._id === id;
  // });
  // console.log(productFound);
  const productFound = true;
  // console.log(id);
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
          {/* <Button>Add to Cart</Button> */}
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
  width: 20vw;
  height: 40vh;
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

export default ProductGridItem;
