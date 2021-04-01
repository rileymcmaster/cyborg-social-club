import React from "react";
import styled from "styled-components";
import ProductGridItem from "./ProductGridItem";

const GenerateProductGrid = ({ items }) => {
  return (
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
const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export default GenerateProductGrid;
