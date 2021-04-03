import React from "react";
import styled, { keyframes } from "styled-components";
import ProductGridItem from "./ProductGridItem";
import { VscLoading } from "react-icons/vsc";

const GenerateProductGrid = ({ loading, items }) => {
  return loading ? (
    <ProductList>
      <Icon>
        <VscLoading />
      </Icon>
    </ProductList>
  ) : (
    items && (
      <ProductList>
        {/* {console.log(items)} */}
        {items.map((item) => {
          return (
            <>
              <ProductGridItem
                items={items}
                id={item._id}
                name={item.name}
                price={item.price}
                imageSrc={item.imageSrc}
                numInStock={item.numInStock}
              />
            </>
          );
        })}
      </ProductList>
    )
  );
};
const Rotate = keyframes`
from {
  transform: rotate(0deg)
}
to {
  transform: rotate(360deg)
}
`;
const Icon = styled.div`
  color: black;
  display: inline-block;
  font-size: 5rem;
  height: 80px;
  animation: ${Rotate} 2s steps(9) infinite;
`;
const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export default GenerateProductGrid;
