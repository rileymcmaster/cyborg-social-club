import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

//WILL NEED TO FIX THE ROUTE in onclick

const SearchBar = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const [closeResults, setCloseResults] = useState(false);

  ///Search results aren't marked if they are category, bodypart, or company.
  // They are just combined but I would like to do that later :)

  const [items, setItems] = useState(null);
  const [companies, setCompanies] = useState(null);
  useEffect(() => {
    fetch("/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data);
      });
    fetch("/companies")
      .then((res) => res.json())
      .then((data) => setCompanies(data.data));
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
  const categoryTitleMatch = uniqueCategories.filter((category) => {
    if (searchValue.length >= 2) {
      // setCloseResults(false);
      return category.toLowerCase().includes(searchValue.toLowerCase());
    }
  });

  //FIND UNIQUE BODY PARTS
  let bodyPartsArray = [];
  if (items) {
    items.map((item) => {
      bodyPartsArray.push(item.body_location);
    });
  }
  const uniqueBodyParts = bodyPartsArray.filter(onlyUniqueValues);
  const bodyPartTitleMatch = uniqueBodyParts.filter((body) => {
    if (searchValue.length >= 2) {
      // setCloseResults(false);
      return body.toLowerCase().includes(searchValue.toLowerCase());
    }
  });

  //FIND COMPANIES
  let companiesArray = [];
  if (companies) {
    companies.map((company) => {
      companiesArray.push(company.name);
    });
  }
  const companyTitleMatch = companiesArray.filter((company) => {
    if (searchValue.length >= 2) {
      // setCloseResults(false);
      return company.toLowerCase().includes(searchValue.toLowerCase());
    }
  });

  //add it all together
  const titleMatch = [
    ...categoryTitleMatch,
    ...bodyPartTitleMatch,
    ...companyTitleMatch,
  ];

  return (
    <>
      <Wrapper>
        <SearchButton
          onClick={() => {
            history.push(`/category/${titleMatch[selectedSuggestionIndex]}`);
            setSearchValue("");
          }}
        >
          <FiSearch />
        </SearchButton>
        <Input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(ev) => {
            setSearchValue(ev.target.value);
            setCloseResults(false);
          }}
          onKeyDown={(ev) => {
            switch (ev.key) {
              case "Enter": {
                if (closeResults) {
                  history.push(`/category/${searchValue}`);
                } else {
                  history.push(
                    `/category/${titleMatch[selectedSuggestionIndex]}`
                  );
                }
                setCloseResults(true);
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
                setCloseResults(false);
                return;
              }
              case "Escape": {
                setCloseResults(true);
                setSelectedSuggestionIndex(-1);
                return;
              }
            }
          }}
        />

        {titleMatch.length >= 1 && !closeResults && (
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
                  onClick={() => {
                    history.push(`/category/${removeSpaces}`);
                    setSearchValue("");
                  }}
                >
                  {category}
                </Suggestion>
              );
            })}
          </SearchResults>
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
