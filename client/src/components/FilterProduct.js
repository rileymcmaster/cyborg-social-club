import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import GenerateProductGrid from "./GenerateProductGrid";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";

const FilterProduct = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  let nextPage = currentPage + 1;
  let previousPage = currentPage - 1;
  let lastPage = Math.ceil(filteredItems.length / itemsPerPage);
  const urlCategory = useParams().category;

  useEffect(() => {
    setCurrentPage(1);
    setLoading(true);
    fetch(
      // `/items/category/${urlCategory.toLowerCase()}?page=${currentPage}&limit=24`
      `/items/category/${urlCategory.toLowerCase()}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFilteredItems(data.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("ERROR", error);
      });
  }, [useParams()]);

  const handlePageNext = () => {
    if (currentPage === lastPage) {
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <Wrapper>
      {loading ? (
        <CenterDiv>
          <Loading />
        </CenterDiv>
      ) : filteredItems.length > 0 &&
        currentItems &&
        urlCategory !== "undefined" ? (
        <>
          {urlCategory === "PetsandAnimals" ? (
            <Title>Search for : Pets and Animals</Title>
          ) : (
            <Title>Search for : {urlCategory}</Title>
          )}
          <Div>
            {/* PAGINATION */}
            <PreviousButton
              onClick={() => handlePageBefore()}
              style={{
                opacity: currentPage <= 1 ? "0%" : "100%",
              }}
            >
              {previousPage}
            </PreviousButton>
            <CurrentButton>{currentPage}</CurrentButton>
            <NextButton
              // disabled={filteredItems.length <= 24}
              onClick={() => handlePageNext()}
              style={{
                opacity: currentPage === lastPage ? "0%" : "100%",
              }}
            >
              {nextPage}
            </NextButton>
          </Div>
          <GenerateProductGrid
            items={currentItems}
            loading={loading}
            setCurrentPage={() => setCurrentPage(1)}
          />
        </>
      ) : (
        <Title>No products found. Try again</Title>
      )}
    </Wrapper>
  );
};

const CenterDiv = styled.div`
  margin: auto;
`;

const Wrapper = styled.div`
  min-height: var(--page-height);
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const Title = styled.h1`
  padding: 10px;
  font-size: 3rem;
  text-align: center;
  margin-top: 20px;
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
  outline: none;
  &:hover {
    border: 3px solid;
    border-color: var(--primary-color);
    color: var(--secondary-color);
    background-color: var(--primary-color);
  }
`;

export default FilterProduct;
