import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductGridItem from "./ProductGridItem";

const ProductGrid = () => {
  const [items, setItems] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  let nextPage = currentPage + 1;
  let previousPage = currentPage - 1;

  useEffect(() => {
    console.log("starting fetch in product grid");
    fetch(`/items?page=${currentPage}&limit=24`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data.data.results);
      });
  }, [currentPage]);
  console.log(items);

  const handlePageNext = () => {
    if (currentPage >= 15) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };
  const handlePageBefore = () => {
    if (currentPage <= 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <Div>
        <PreviousButton onClick={() => handlePageBefore()}>
          {previousPage}
        </PreviousButton>
        <CurrentButton>{currentPage}</CurrentButton>
        <NextButton onClick={() => handlePageNext()}>{nextPage}</NextButton>
      </Div>
      {items && (
        <ProductList>
          {console.log(items)}
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
          <Div>
            <PreviousButton onClick={() => handlePageBefore()}>
              {previousPage}
            </PreviousButton>
            <CurrentButton>{currentPage}</CurrentButton>
            <NextButton onClick={() => handlePageNext()}>{nextPage}</NextButton>
          </Div>
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

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 30px;
`;

const PreviousButton = styled.button`
  border: 3px solid;
  border-color: (--primary-color);
  color: var(--primary-color);
  background-color: var(--secondary-color);
  opacity: 90%;
  padding: 5px 10px 5px 10px;
  font-size: 10px;
  cursor: pointer;
  outline: none;
  &:hover {
    border: 3px solid;
    border-color: var(--primary-color);
    color: var(--secondary-color);
    background-color: var(--primary-color);
  }
`;

const CurrentButton = styled.button`
  margin: 10px;
  border: 3px solid;
  border-color: (--primary-color);
  color: var(--primary-color);
  background-color: var(--secondary-color);
  padding: 10px 20px 10px 20px;
  font-size: 15px;
  outline: none;
`;

const NextButton = styled.button`
  border: 3px solid;
  border-color: (--primary-color);
  color: var(--primary-color);
  background-color: var(--secondary-color);
  opacity: 90%;
  padding: 5px 10px 5px 10px;
  font-size: 10px;
  cursor: pointer;
  outline: none;
  &:hover {
    border: 3px solid;
    border-color: var(--primary-color);
    color: var(--secondary-color);
    background-color: var(--primary-color);
  }
`;

export default ProductGrid;
