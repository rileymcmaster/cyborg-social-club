import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GenerateProductGrid from "./GenerateProductGrid";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import SidebarFilter from "./SidebarFilter";
import ErrorPage from "./ErrorPage";
import { useMediaQuery } from "./useMediaQuery";
import Loading from "./Loading";

const ProductGrid = () => {
  //check width of page
  let isPageWide = useMediaQuery("(min-width: 900px)");
  //check filters
  const filterState = useSelector((state) => state.filter);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  let nextPage = currentPage + 1;
  let previousPage = currentPage - 1;
  let lastPage = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    setLoading(true);
    // console.log("starting fetch in product grid");
    //BACKEND PAGINATION VVV
    // fetch(`/items?page=${currentPage}&limit=24`)
    //FRONTEND PAGINATION VVV
    fetch(`/items`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setItems(data.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("ERROR", error);
        setError(true);
      });
  }, []);
  // ^^this was dependent on currentPage. Might have to put it back

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

  //FILTER
  const [checkedFilter, setCheckedFilter] = useState([]);
  let filteredItems = [];
  if (items && checkedFilter) {
    items.filter((item) => {
      // console.log("item", item.body_location);
      Object.values(filterState).find((filter) => {
        //CATEGORY
        if (filter.kind === "category" && filter.name === item.category) {
          filteredItems.push(item);
        } else if (
          //PARTS
          filter.kind === "parts" &&
          filter.name === item.body_location
        ) {
          if (filteredItems.includes(item)) {
            return;
          } else {
            filteredItems.push(item);
          }
        }
      });
    });
  }
  //RESET TO FIRST PAGE when filters are changed
  useEffect(() => {
    setCurrentPage(1);
  }, [checkedFilter]);

  //GET CURRENT ITEMS PER PAGE
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    filteredItems.length > 0
      ? filteredItems.slice(indexOfFirstItem, indexOfLastItem)
      : items.slice(indexOfFirstItem, indexOfLastItem);

  return loading ? (
    <Wrapper>
      <CenterDiv>
        <Loading />
      </CenterDiv>
    </Wrapper>
  ) : error ? (
    <ErrorPage />
  ) : (
    <Wrapper>
      <GridDisplay>
        {isPageWide ? (
          <SidebarGrid>
            <SidebarFilter />
          </SidebarGrid>
        ) : (
          <></>
        )}
        <ProductGridArea>
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
              onClick={() => handlePageNext()}
              style={{
                opacity: currentPage === lastPage ? "0%" : "100%",
              }}
            >
              {nextPage}
            </NextButton>
          </Div>
          {/* END PAGINATION */}

          {/* ITEM GRID */}

          <GenerateProductGrid
            items={currentItems}
            loading={loading}
            setCurrentPage={() => setCurrentPage(1)}
          />

          {/* END ITEM GRID */}

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
              onClick={() => handlePageNext()}
              style={{
                opacity: currentPage >= 15 ? "0%" : "100%",
              }}
            >
              {nextPage}
            </NextButton>
          </Div>
          {/* )} */}
        </ProductGridArea>
      </GridDisplay>
    </Wrapper>
  );
};
const CenterDiv = styled.div`
  margin: auto;
`;
const ProductGridArea = styled.div`
  display: block;
  margin-right: auto;
`;
const SidebarGrid = styled.div`
  min-width: 200px;
  margin-top: 50px;
  margin-right: auto;
`;
const GridDisplay = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const Wrapper = styled.div`
  min-height: var(--page-height);
  width: 100%;
  display: flex;
  flex-direction: column;
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

export default ProductGrid;
