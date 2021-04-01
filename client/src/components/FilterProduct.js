import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import GenerateProductGrid from "./GenerateProductGrid";

const FilterProduct = () => {
  const [filteredItems, setFilteredItems] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageItems, setPageItems] = useState();
  const [pageItemsIndex, setPageItemsIndex] = useState(0);

  let nextPage = currentPage + 1;
  let previousPage = currentPage - 1;
  const maxResults = 24;
  let resultsArray = [];
  for (
    let i = (currentPage - 1) * maxResults;
    i < (currentPage - 1) * maxResults + maxResults;
    i++
  ) {
    resultsArray.push(i);
  }
  // console.log(resultsArray);

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

  ///PAGINATION attempt
  // useEffect(() => {
  //   if (filteredItems) {
  //     resultsArray.map((result) => {
  //       // console.log(filteredItems[result]);
  //       // console.log("result", result);
  //       setPageItems(...pageItems, filteredItems(result));
  //     });
  //   }
  // }, []);

  const handlePageNext = () => {
    if (currentPage >= filteredItems.length) {
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
    <Wrapper>
      {filteredItems && filteredItems.length > 0 ? (
        <>
          {urlCategory === "PetsandAnimals" ? (
            <Title>Search for : Pets and Animsl</Title>
          ) : (
            <Title>Search for : {urlCategory}</Title>
          )}
          {/* <Pagination>
            <PreviousButton onClick={() => handlePageBefore()}>
              {previousPage}
            </PreviousButton>
            <CurrentButton>{currentPage}</CurrentButton>
            <NextButton onClick={() => handlePageNext()}>{nextPage}</NextButton>
          </Pagination> */}
          <GenerateProductGrid items={filteredItems} />
        </>
      ) : filteredItems && urlCategory === "undefined" ? (
        <Title>No search results</Title>
      ) : filteredItems && filteredItems.length === 0 ? (
        <Title>No products found. Try again</Title>
      ) : (
        <div>LOADING</div>
      )}
    </Wrapper>
  );
};

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  min-height: var(--page-height);
`;
const Title = styled.h1`
  padding: 10px;
  font-size: 3rem;
  text-align: center;
  margin-top: 20px;
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

export default FilterProduct;
