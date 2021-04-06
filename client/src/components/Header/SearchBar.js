import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { useMediaQuery } from "../useMediaQuery";

//WILL NEED TO FIX THE ROUTE in onclick

const SearchBar = ({ hideMenu }) => {
  let isPageWide = useMediaQuery("(min-width: 900px)");
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const [closeResults, setCloseResults] = useState(false);

  const [items, setItems] = useState(null);
  const [companies, setCompanies] = useState(null);
  useEffect(() => {
    // console.log("starting fetch");
    fetch("/items")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setItems(data.data.results);
        // console.log("ending fetch", data);
      });
    fetch("/companies")
      .then((res) => res.json())
      .then((data) => setCompanies(data.data));
    const closeSearch = () => {
      setCloseResults(true);
    };
  }, []);

  useEffect(() => {
    const clickToClose = () => {
      setCloseResults(true);
    };
    window.addEventListener("click", clickToClose);
    return () => window.removeEventListener("click", clickToClose);
  });
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
        {isPageWide ? (
          <SearchButton
            onClick={() => {
              history.push(`/category/${titleMatch[selectedSuggestionIndex]}`);
              setSearchValue("");
            }}
          >
            <FiSearch />
          </SearchButton>
        ) : (
          <></>
        )}
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
                hideMenu();
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
                hideMenu();
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
                    hideMenu();
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
  margin-top: 5px;
  background-color: white;
  box-shadow: 2px 2px 5px var(--primary-color), 5px 5px 10px rgba(0, 0, 0, 0.5);
`;
const Input = styled.input`
  border: none;
  width: 100%;
  outline: none;
  height: 40px;
  padding: 0 20px 0 5px;
  &:focus {
    box-shadow: 1px 1px 10px var(--primary-color), 0 0 50px var(--primary-color);
  }
`;

const SearchButton = styled.button`
  position: absolute;
  width: 40px;
  height: 40px;
  z-index: 99;
  /* margin-left: auto; */
  right: 0;

  /* margin: -3px 0 0 -30px; */
  color: black;
  font-size: 1.5rem;
  border: none;
  outline: none;
  background-color: transparent;
  &:active {
    font-size: 1rem;
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export default SearchBar;
