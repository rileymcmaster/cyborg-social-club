import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "./Button";

const HomePage = () => {
  return (
    <MainDiv>
      <FreeShippingBanner>Free shipping on orders over $99</FreeShippingBanner>
      <ImgDiv>
        <ShopNowButton to="/products">View All Products!</ShopNowButton>
      </ImgDiv>
      <CategoryP>Shop Categories</CategoryP>
      <Categories>
        <CategoryDiv>
          <CategoryImg src="/images/fitness.jpg" />
          <CategoryName>Fitness</CategoryName>
          <SeeAllLink to="/category/Fitness">View All</SeeAllLink>
        </CategoryDiv>
        <CategoryDiv>
          <CategoryImg src="/images/medical.jpg" />
          <CategoryName>Medical</CategoryName>
          <SeeAllLink to="/category/Medical">View All</SeeAllLink>
        </CategoryDiv>
        <CategoryDiv>
          <CategoryImg src="/images/lifestyle.jpg" />
          <CategoryName>Lifestyle</CategoryName>
          <SeeAllLink to="/category/Lifestyle">View All</SeeAllLink>
        </CategoryDiv>
        <CategoryDiv>
          <CategoryImg src="/images/entertainment.jpg" />
          <CategoryName>Entertainment</CategoryName>
          <SeeAllLink to="/category/Entertainment">View All</SeeAllLink>
        </CategoryDiv>
        <CategoryDiv>
          <CategoryImg src="/images/industrial.jpg" />
          <CategoryName>industrial</CategoryName>
          <SeeAllLink to="/category/Industrial">View All</SeeAllLink>
        </CategoryDiv>
        <CategoryDiv>
          <CategoryImg src="/images/pet.jpg" />
          <CategoryName>Pets and Animals</CategoryName>
          <SeeAllLink>View All</SeeAllLink>
        </CategoryDiv>
        <CategoryDiv>
          <CategoryImg src="/images/gaming.jpg" />
          <CategoryName>Gaming</CategoryName>
          <SeeAllLink to="/category/Gaming">View All</SeeAllLink>
        </CategoryDiv>
      </Categories>
      <CategoryP>Shop Our Top Brands</CategoryP>
      <BrandDiv>
        <TopBrands to="/category/Nike">
          <BrandImg src="/images/Nike.png" />
        </TopBrands>
        <TopBrands to="/category/Samsung">
          <BrandImg src="/images/Samsung.png" />
        </TopBrands>
        <TopBrands to="/category/Casio">
          <BrandImg src="/images/Casio.png" />
        </TopBrands>
        <TopBrands to="/category/Fitbit">
          <BrandImg src="/images/fitbit.png" />
        </TopBrands>
        <TopBrands to="/category/Belkin">
          <BrandImg src="/images/belkin.png" />
        </TopBrands>
        <TopBrands to="/category/Lg">
          <BrandImg src="/images/LG.png" />
        </TopBrands>
      </BrandDiv>
      <NewsLetter>
        <CategoryP>
          Subscribe To Our Mailing List For The Lastest News!
        </CategoryP>
        <Form>
          <input
            type="email"
            placeholder="Email Address"
            style={{
              height: "50px",
              width: "20vw",
              outline: "none",
              border: "2px solid var(--primary-color)",
            }}
          ></input>
          <Button type="submit">Subscribe</Button>
        </Form>
      </NewsLetter>
    </MainDiv>
  );
};

export default HomePage;

const MainDiv = styled.div`
  height: 100%;
  width: 100%;
`;

const ImgDiv = styled.div`
  height: 500px;
  overflow: hidden;
  background-image: url("/images/mountainBackground.jpg");
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 0;
`;

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
  margin: 20px;
  /* background-color: yellow; */
`;

const CategoryDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  padding: 20px;
  /* background-color: red; */
`;

const TopBrands = styled(Link)`
  width: 10vw;
  height: 100%;
  margin: 30px;
  padding: 30px;
  display: flex;
  text-align: center;
  justify-content: center;
`;

const BrandDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color);
`;

const Form = styled.div`
  padding-bottom: 50px;
`;

const NewsLetter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ShopNowButton = styled(Link)`
  text-decoration: none;
  outline: none;
  border: 2px solid;
  border-color: var(--primary-color);
  font-weight: bold;
  padding: 30px;
  font-size: 30px;
  color: var(--secondary-color);
  background-color: var(--primary-color);
  border: 4px solid var(--secondary-color);
  cursor: pointer;
  /* position: absolute; */
  &:hover {
    /* border-color: (--accent-bg-color); */
    color: var(--primary-color);
    background-color: var(--secondary-color);
    border: 4px solid var(--primary-color);
  }
`;

const CategoryImg = styled.img`
  width: 300px;
  height: 100%;
`;

const CategoryP = styled.h1`
  text-align: center;
  font-size: 25px;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const FreeShippingBanner = styled.p`
  width: 100%;
  background-color: var(--primary-color);
  padding: 15px;
  text-align: center;
`;

const CategoryName = styled.p`
  font-size: 15px;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const SeeAllLink = styled(Link)`
  text-decoration: none;
  outline: none;
  border: 2px solid;
  border-color: (--primary-color);
  font-weight: bold;
  padding: 10px;
  color: var(--secondary-color);
  cursor: pointer;
  text-align: center;
  background-color: var(--primary-color);
  &:hover {
    color: var(--primary-color);
    background-color: var(--secondary-color);
    border: 2px solid var(--primary-color);
  }
`;
const BrandImg = styled.img`
  width: 150px;
  height: 100%;
`;
