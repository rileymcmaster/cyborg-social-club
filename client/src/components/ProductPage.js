import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Button from "./Button";
// import Cart from "./Cart";

const ProductPage = () => {
  const [item, setItem] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const [quantityInputValue, setQuantityInputValue] = React.useState(1);

  let { id } = useParams();

  const handlePlusClick = () => {
    setQuantity(quantity + 1);
    setQuantityInputValue(quantityInputValue + 1);
  };

  const handleMinusClick = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setQuantityInputValue(quantityInputValue - 1);
    }
  };

  React.useEffect(() => {
    fetch(`/item/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.data);
        console.log(data.data);
      });
  }, [id]);

  return (
    <>
      {item ? (
        <ProductDiv>
          <ProductImg src={item.imageSrc} />
          <ProductDiv2>
            <Name>{item.name}</Name>
            <Price>{item.price}</Price>
            <Button disabled={item.numInStock <= 0}>
              {item.numInStock <= 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
            <MainInput>
              <Button onClick={handleMinusClick}>-</Button>
              <Input
                type="text"
                value={quantityInputValue}
                onChange={(ev) => {
                  setQuantityInputValue(Number(ev.target.value));
                }}
              ></Input>
              <Button onClick={handlePlusClick}>+</Button>
            </MainInput>
          </ProductDiv2>
        </ProductDiv>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

const ProductDiv = styled.div``;
const ProductDiv2 = styled.div``;
const ProductImg = styled.img``;
const Name = styled.p``;
const Price = styled.p``;
const MainInput = styled.div``;
const Input = styled.div``;

export default ProductPage;
