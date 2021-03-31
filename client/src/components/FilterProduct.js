import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductGridItem from "./ProductGridItem";
import { useParams } from "react-router-dom";

const FilterProduct = () => {
  const [filteredItems, setFilteredItems] = useState(null);

  const urlCategory = useParams().category;

  useEffect(() => {
    fetch(`/items/category/${urlCategory.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("Data", data);
        setFilteredItems(data.data);
      })
      .catch((error) => console.log("ERROR", error));
  }, [useParams()]);

  return filteredItems && filteredItems.length > 0 ? (
    <>
      <Title>Search for : {urlCategory}</Title>
      <ProductList>
        {filteredItems.map((item) => {
          return (
            <ProductGridItem
              id={item._id}
              name={item.name}
              price={item.price}
              imageSrc={item.imageSrc}
            />
          );
        })}
      </ProductList>
    </>
  ) : filteredItems && urlCategory === "undefined" ? (
    <Title>No search results</Title>
  ) : (
    <div>LOADING</div>
  );
};

const Title = styled.h1`
  padding: 10px;
  font-size: 3rem;
  text-align: center;
  margin-top: 20px;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export default FilterProduct;
