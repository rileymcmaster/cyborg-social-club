import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GenerateProductGrid from "./GenerateProductGrid";
import { useHistory } from "react-router-dom";
import SidebarFilter from "./SidebarFilter";
import ErrorPage from "./ErrorPage";

const ProductGrid = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  let nextPage = currentPage + 1;
  let previousPage = currentPage - 1;

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
      })
      .catch((error) => {
        console.log("ERROR", error);
        setError(true);
      });
    setLoading(false);
  }, []);
  // ^^this was dependent on currentPage. Might have to put it back

  const handlePageNext = () => {
    if (currentPage >= items.length) {
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
      checkedFilter.find((filter) => {
        //CATEGORY
        if (filter.kind === "category" && filter.name === item.category) {
          filteredItems.push(item);
        } else if (
          //PARTS
          filter.kind === "parts" &&
          filter.name === item.body_location
        ) {
          filteredItems.push(item);
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

  return error ? (
    <ErrorPage />
  ) : (
    <Wrapper>
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
      {/* END PAGINATION */}
      <GridDisplay>
        <SidebarGrid>
          <SidebarFilter
            checked={checkedFilter}
            setChecked={setCheckedFilter}
          />
        </SidebarGrid>
        {/* ITEM GRID */}
        <ProductGridArea>
          <GenerateProductGrid
            items={currentItems}
            loading={loading}
            setCurrentPage={() => setCurrentPage(1)}
          />
        </ProductGridArea>

        {/* END ITEM GRID */}
      </GridDisplay>
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
      {/* </ProductList> */}
      {/* )} */}
    </Wrapper>
  );
};

const ProductGridArea = styled.div`
  grid-area: main;
`;
const SidebarGrid = styled.div`
  grid-area: sidebar;
`;
const GridDisplay = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-areas: "sidebar main";
`;
const Wrapper = styled.div`
  min-height: var(--page-height);
`;
// const ProductList = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   align-items: center;
//   justify-content: center;
// `;

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
