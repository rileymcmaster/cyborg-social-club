import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

//WILL NEED TO FIX THE ROUTE in onclick

const SearchBar = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

  //   console.log("SEARCH", searchValue);

  ///TEMP WORKING WITH CATEGORIES this way
  const [items, setItems] = useState(null);
  useEffect(() => {
    fetch("/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data);
      });
  }, []);

  //FIND UNIQUE CATEGORIES
  let categoriesArray = [];
  if (items) {
    items.map((item) => {
      categoriesArray.push(item.category);
    });
  }
  const onlyUniqueValues = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  const uniqueCategories = categoriesArray.filter(onlyUniqueValues);
  /////////end of catgeories

  //FIND MATCHING CATEGORIES to SEARCH VALUE
  const titleMatch = uniqueCategories.filter((category) => {
    if (searchValue.length >= 2) {
      return category.toLowerCase().includes(searchValue.toLowerCase());
    }
  });
  //   console.log("TM", titleMatch);

  return (
    <>
      <Wrapper>
        <SearchButton
          onClick={() => {
            history.push(`/${titleMatch[selectedSuggestionIndex]}`);
            setSearchValue("");
          }}
        >
          <FiSearch />
        </SearchButton>
        <Input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(ev) => setSearchValue(ev.target.value)}
          onKeyDown={(ev) => {
            switch (ev.key) {
              case "Enter": {
                history.push(`/${titleMatch[selectedSuggestionIndex]}`);
                setSearchValue("");
                return;
              }
              case "ArrowUp": {
                selectedSuggestionIndex <= 0
                  ? setSelectedSuggestionIndex(selectedSuggestionIndex)
                  : setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
                return;
              }
              case "ArrowDown": {
                selectedSuggestionIndex >= titleMatch.length - 1
                  ? setSelectedSuggestionIndex(selectedSuggestionIndex)
                  : setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
              }
            }
          }}
        />

        {titleMatch.length >= 1 ? (
          <SearchResults>
            {titleMatch.map((category, index) => {
              let removeSpaces = category.split(" ").join("");
              let isSelected = false;
              if (index === selectedSuggestionIndex) {
                isSelected = true;
              }
              return (
                <Suggestion
                  role="option"
                  id={removeSpaces}
                  key={removeSpaces}
                  class={removeSpaces}
                  onMouseOver={() => setSelectedSuggestionIndex(index)}
                  style={{
                    background: isSelected ? "var(--primary-color)" : "white",
                    color: isSelected ? "white" : "var(--primary-color)",
                  }}
                  /////THIS WILL NEED TO FIGURED OUT WITH THE ROUTING
                  onClick={() => history.push(`/${removeSpaces}`)}
                >
                  {category}
                </Suggestion>
              );
            })}
          </SearchResults>
        ) : (
          <div></div>
        )}
      </Wrapper>
    </>
  );
};
const Suggestion = styled.li`
  position: relative;
  padding: 20px;
  margin: 10px;
`;
const SearchResults = styled.ul`
  position: absolute;
  width: 400px;
  /* border: 5px solid red; */
  margin-top: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;
const Input = styled.input`
  border: none;
  outline: none;
  height: 40px;
  padding: 0 20px 0 5px;
`;

const SearchButton = styled.button`
  position: absolute;
  width: 40px;
  height: 40px;
  z-index: 99;
  right: 0;
  /* margin: -3px 0 0 -30px; */
  color: black;
  font-size: 1.5rem;
  border: none;
  /* background-color: blue; */
  outline: none;
  &:active {
    font-size: 1rem;
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

export default SearchBar;
