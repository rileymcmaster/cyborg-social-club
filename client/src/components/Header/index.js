import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { GiRobotAntennas, GiShoppingCart } from "react-icons/gi";
import CategoriesDD from "./CategoriesDD";
import BrandsDD from "./BrandsDD";
import ShoppingCartIcon from "./ShoppingCartIcon";
import SearchBar from "./SearchBar";
import BodyPartsDD from "./BodyPartsDD";
import CurrentUser from "./CurrentUser";
import { useMediaQuery } from "../../components/useMediaQuery";
import { GiHamburgerMenu } from "react-icons/gi";
import BurgerMenu from "./BurgerMenu";

const Header = () => {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  //check the width of the browser
  let isPageWide = useMediaQuery("(min-width: 900px)");
  const hideMenu = () => {
    setShowBurgerMenu(false);
  };

  return isPageWide ? (
    <Wrapper>
      <FirstRow>
        <SearchDiv>
          <SearchBar />
        </SearchDiv>
        <NavigationLink to={"/"}>
          <Title>
            <Logo>
              <GiRobotAntennas />
            </Logo>
            <h1>Cyborg Social Club</h1>
          </Title>
        </NavigationLink>

        {/* SIGNUP OR LOGIN */}
        {/* NEED STATE TO DETERMINE IF IT IS LOGIN OR WELCOME */}
        <Element>
          <NavigationLink to={"/sign-in"}>
            <CurrentUser />
          </NavigationLink>
          {/* SHOPPING CART */}
          <NavigationLink to={"/cart"}>
            <ShoppingCartIcon />
          </NavigationLink>
        </Element>
      </FirstRow>
      {/* DROPDOWN MENUS */}
      <SecondRow>
        <CategoriesDD />
        <BodyPartsDD />
        <BrandsDD />
      </SecondRow>
    </Wrapper>
  ) : (
    //MOBILE HEADER
    <Wrapper style={{ flexDirection: "row" }}>
      {/* //BURGER MENU */}
      <MenuDiv>
        <Logo onClick={() => setShowBurgerMenu(!showBurgerMenu)}>
          <GiHamburgerMenu />
        </Logo>
        {showBurgerMenu ? (
          <ShowMenu>
            <BurgerMenu hideMenu={() => hideMenu()} />
          </ShowMenu>
        ) : (
          <></>
        )}
      </MenuDiv>

      {/* LOGO */}
      <NavigationLink to={"/"}>
        <Logo>
          <GiRobotAntennas />
        </Logo>
      </NavigationLink>
    </Wrapper>
  );
};

const SearchDiv = styled.div`
  width: 200px;
  z-index: 999999999;
`;
const ShowMenu = styled.div`
  position: absolute;
  width: 100%;
  margin-top: 3.72rem;
  margin-left: -20px;
  margin-right: -20px; ;
`;

const MenuDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100vw;
  z-index: 999999999;
`;
const Element = styled.div`
  display: flex;
  flex-direction: row;
`;
const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
const SecondRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  justify-content: space-between;
`;
const NavigationLink = styled(NavLink)`
  color: black;
  text-decoration: none;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 2rem;
`;

const Logo = styled.div`
  font-size: 3rem;

  color: var(--primary-color);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-between;
  width: 100%;
  /* height: 200px; */
  /* height: var(--header-height); */
  padding: 20px;
  align-items: center;
  background-color: var(--secondary-color);
`;

export default Header;
