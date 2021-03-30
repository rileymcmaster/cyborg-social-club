import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Item from "./Item";

const ItemGrid = () => {
  const [items, setItems] = useState(null);
  useEffect(() => {
    fetch("/items")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
                <Item
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  imageSrc={item.imageSrc}
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

export default ItemGrid;
