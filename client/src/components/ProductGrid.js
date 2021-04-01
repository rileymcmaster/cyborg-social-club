import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GenerateProductGrid from "./GenerateProductGrid";
import { useParams } from "react-router-dom";
import SidebarFilter from "./SidebarFilter";

const ProductGrid = () => {
  const [items, setItems] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  let nextPage = currentPage + 1;
  let previousPage = currentPage - 1;

  useEffect(() => {
    // console.log("starting fetch in product grid");
    fetch(`/items?page=${currentPage}&limit=24`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setItems(data.data.results);
      });
  }, [currentPage]);
  // console.log(items);

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

  return (
    <>
      <Div>
        {/* PAGINATION */}
        <PreviousButton onClick={() => handlePageBefore()}>
          {previousPage}
        </PreviousButton>
        <CurrentButton>{currentPage}</CurrentButton>
        <NextButton onClick={() => handlePageNext()}>{nextPage}</NextButton>
      </Div>
      {/* END PAGINATION */}
      <GridLayout>
        <SidebarArea>
          <SidebarFilter />
        </SidebarArea>
        {/* ITEM GRID */}
        <MainArea>
          <GenerateProductGrid items={items} />
        </MainArea>
        {/* END ITEM GRID */}
        <Div>
          {/* PAGINATION */}
          <PreviousButton onClick={() => handlePageBefore()}>
            {previousPage}
          </PreviousButton>
          <CurrentButton>{currentPage}</CurrentButton>
          <NextButton onClick={() => handlePageNext()}>{nextPage}</NextButton>
        </Div>
        {/* </ProductList> */}
        {/* )} */}
      </GridLayout>
    </>
  );
};
const MainArea = styled.div`
  grid-area: main;
`;

const SidebarArea = styled.div`
  margin-top: 20px;
  grid-area: sidebar;
`;
const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: auto;
  grid-template-areas: "sidebar main";
`;

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
