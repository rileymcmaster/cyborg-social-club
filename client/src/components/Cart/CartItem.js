import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import { updateQuantity, removeProduct } from "../../actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useMediaQuery } from "../../components/useMediaQuery";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  const formattedUnitPrice = Number(product.price.slice(1));
  const subtotalPrice = formattedUnitPrice * quantity;
  const formattedSubtotalPrice = parseFloat(subtotalPrice).toFixed(2);
  let isPageWide = useMediaQuery("(min-width: 900px)");

  const handlePlusClick = () => {
    setQuantity(quantity + 1);
    dispatch(updateQuantity(product, product.quantity + 1));
  };

  const handleMinusClick = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(updateQuantity(product, product.quantity - 1));
    }
  };
  console.log(product);

  return isPageWide ? (
    <>
      <CartItemWrapper>
        <ProductInfo>
          <Link to={`/item/${product.id}`}>
            <ProductImage src={product.imageSrc}></ProductImage>
          </Link>
          <div>
            <div style={{ width: "300px" }}>
              <Link to={`/item/${product.id}`}>{product.name}</Link>
            </div>
            <div style={{ color: "gray" }}>SKU: {product.id}</div>
            <div style={{ marginTop: "2em" }}>Price: {product.price}</div>
          </div>
        </ProductInfo>
        <SelectQuantity>
          <Input>
            <button onClick={handleMinusClick}>-</button>
            <input
              type="text"
              value={quantity}
              onChange={(ev) => {
                setQuantity(Number(ev.target.value));
              }}
            ></input>
            <button onClick={handlePlusClick}>+</button>
          </Input>
          {/* <Button
            onClick={() => {
              dispatch(updateQuantity(product, quantity));
            }}
            style={{
              background: "black",
              color: "white",
              margin: " 15px 0",
            }}
          >
            Update total
          </Button> */}
        </SelectQuantity>
        <Price>${formattedSubtotalPrice}</Price>
      </CartItemWrapper>
      <DeleteProduct>
        <Button
          style={{
            background: "none",
            textDecoration: "underline",
            textAlign: "left",
            marginLeft: "0",
          }}
          onClick={() => dispatch(removeProduct(product.id))}
        >
          Remove
        </Button>
      </DeleteProduct>
      <Divider />
    </>
  ) : (
    //MOBILE
    <>
      <CartItemWrapper style={{ flexDirection: "column" }}>
        <ProductInfo style={{ flexDirection: "column", marginBottom: "10px" }}>
          <Link to={`/item/${product.id}`}>
            <ProductImage src={product.imageSrc}></ProductImage>
          </Link>
          <div>
            <div style={{ width: "300px" }}>
              <Link to={`/item/${product.id}`}>{product.name}</Link>
            </div>
            <div style={{ color: "gray" }}>SKU: {product.id}</div>
            <div style={{ marginTop: "2em", marginBottom: "30px" }}>
              Price: {product.price}
            </div>
          </div>
        </ProductInfo>
        <SelectQuantity style={{ marginBottom: "30px" }}>
          <h1 style={{ marginBottom: "10px" }}>Quantity</h1>
          <Input>
            <button onClick={handleMinusClick}>-</button>
            <input
              type="text"
              value={quantity}
              onChange={(ev) => {
                setQuantity(Number(ev.target.value));
              }}
            ></input>
            <button onClick={handlePlusClick}>+</button>
          </Input>
        </SelectQuantity>
        <h1 style={{ marginBottom: "10px" }}>Subtotal</h1>
        <Price style={{ marginBottom: "10px" }}>
          ${formattedSubtotalPrice}
        </Price>
      </CartItemWrapper>
      <DeleteProduct
        style={{
          justifyContent: "flex-start",
        }}
      >
        <Button
          style={{
            background: "none",
            textDecoration: "underline",
            textAlign: "left",
            marginLeft: "0",
          }}
          onClick={() => dispatch(removeProduct(product.id))}
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
