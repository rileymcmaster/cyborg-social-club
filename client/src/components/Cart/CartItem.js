import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button";

const CartItem = () => {
  const [quantity, setQuantity] = useState(1);

  const handlePlusClick = () => {
    setQuantity(quantity + 1);
  };

  const handleMinusClick = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <CartItemWrapper>
        <ProductInfo>
          <ProductImage src="https://cdn.shopify.com/s/files/1/0255/9062/8401/products/product-image-1312142062_394x.jpg?v=1587617282"></ProductImage>
          <div>
            <div style={{ width: "300px" }}>
              Barska GB12166 Fitness Watch with Heart Rate Monitor
            </div>
            <div style={{ color: "gray" }}>SKU: 6543</div>
            <div style={{ marginTop: "2em" }}>Price: $ 20</div>
          </div>
        </ProductInfo>
        <SelectQuantity>
          <Input>
            <button onClick={handleMinusClick}>-</button>
            <input type="text" placeholder="1" value={quantity}></input>
            <button onClick={handlePlusClick}>+</button>
          </Input>
          <Button
            style={{
              background: "black",
              color: "white",
              margin: " 15px 0",
            }}
          >
            Update
          </Button>
        </SelectQuantity>
        <Price>$200</Price>
      </CartItemWrapper>
      <DeleteProduct>
        <Button
          style={{
            background: "none",
            textDecoration: "underline",
            textAlign: "left",
            marginLeft: "0",
          }}
        >
          Remove
        </Button>
      </DeleteProduct>
      <Divider />
    </>
  );
};

const CartItemWrapper = styled.li`
  display: flex;
  margin: 3em 1em;
  justify-content: space-between;
`;
const ProductInfo = styled.div`
  display: flex;
`;
const ProductImage = styled.img`
  width: 120px;
  margin-right: 30px;
`;
const SelectQuantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 60px;
`;
const Input = styled.div`
  display: flex;

  input {
    width: 36px;
    height: 36px;
    border: 1px solid #000;
    text-align: center;
  }
  input::placeholder {
    text-align: center;
    margin-left: auto;
    color: #000;
    font-size: 15px;
  }

  button {
    width: 36px;
    height: 36px;
    background: none;
    border: 1px solid #eee;
  }
`;
const Price = styled.div`
  margin-right: 20px;
  font-weight: 800;
`;
const DeleteProduct = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const Divider = styled.hr`
  background-color: #f6f6f6;
`;
export default CartItem;
