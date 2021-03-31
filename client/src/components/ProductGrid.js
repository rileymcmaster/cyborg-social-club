import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductGridItem from "./ProductGridItem";

const ProductGrid = () => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch("/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data);
      });
  }, []);

  return (
    <>
      {items && (
        <ProductList>
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
      )}
    </>
  );
};

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export default ProductGrid;
