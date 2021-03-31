import React, { createRef, useRef, useState } from "react";
import Button from "../Button";
import styled from "styled-components";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { SiVisa } from "react-icons/si";
import {
  FaCcMastercard,
  FaCcAmex,
  FaShippingFast,
  FaApplePay,
  FaPaypal,
} from "react-icons/fa";
import { Divider } from "./CartItem";
import { useSelector } from "react-redux";

const Cart = () => {
  const [couponValue, setCouponValue] = useState(null);
  const state = useSelector((state) => Object.values(state.cart));

  console.log(state);

  let totalPrice;

  if (state.length !== 0) {
    const prices = state.map((product) => Number(product.price.slice(1)));
    const quantities = state.map((product) => Number(product.quantity));
    const subtotals = prices.map((price, index) => price * quantities[index]);

    totalPrice = subtotals.reduce((accumulator, currentValue) => {
      return (accumulator = accumulator + currentValue);
    });
  } else {
    totalPrice = 0;
  }

  const formattedTotalPrice = parseFloat(totalPrice).toFixed(2);
  return (
    <CartWrapper>
      <CartDetails>
        <CartHeader>
          <h1>Your Cart</h1>
          <div>You have {state.length} items in your cart</div>
          <CartHeadings>
            <Heading>Product</Heading>
            <Heading style={{ marginLeft: "370px" }}>Quantity</Heading>
            <Heading style={{ marginRight: "20px" }}>Subtotal</Heading>
          </CartHeadings>
        </CartHeader>
        <div>
          {state.map((product) => {
            return <CartItem product={product} />;
          })}
        </div>
        <CartFooter>
          <h2>Items related to your order</h2>
        </CartFooter>
      </CartDetails>
      <OrderSummary>
        <h2>Order Summary</h2>
        <Divider />
        <Info style={{ display: "flex" }}>
          <FaShippingFast
            size={50}
            color="green"
            style={{ marginRight: "20px" }}
          />
          <p style={{ fontSize: "15px" }}>
            Free shipping within Canada for orders over $99.
          </p>
        </Info>
        <CartTotal>
          <div>Total:</div>
          <div>$CAD {formattedTotalPrice} </div>
        </CartTotal>
        <Discount>
          <h4>Discount code</h4>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "0.5em",
            }}
          >
            <input
              type="text"
              onChange={(ev) => {
                setCouponValue(ev.target.value);
              }}
            />
            <Button
              disabled={couponValue ? false : true}
              style={{ width: "30%", margin: "0" }}
            >
              Apply
            </Button>
          </div>
        </Discount>
        <Link
          to="/form"
          style={{ margin: "0", width: "100%", fontSize: "18px" }}
        >
          Checkout
        </Link>
        <Info>
          <h4>Need help?</h4>
          <a href="#">FAQ </a>
          <div>Live Chat with us </div>
          <div>Call us 1 (888) 899-0660</div>
          <div style={{ marginTop: "2em" }}>We Accept</div>
          <Logos>
            <SiVisa size={30} />
            <FaCcMastercard size={30} />
            <FaCcAmex size={30} />
            <FaPaypal size={30} />
            <FaApplePay size={30} />
          </Logos>
          <div style={{ fontSize: "14px", marginTop: "2em" }}>
            All prices shown in Canadian (CAD) dollars.
          </div>
        </Info>
      </OrderSummary>
    </CartWrapper>
  );
};

const CartWrapper = styled.div`
  display: flex;
  margin: 6em;
`;

const CartDetails = styled.ul`
  flex-grow: 2;
  margin-right: 6em;
  list-style: none;
`;

const CartHeader = styled.div`
  border-bottom: 1px solid #000;
`;

const CartHeadings = styled.div`
  margin-top: 3em;
  display: flex;
  justify-content: space-between;
`;

const Heading = styled.h2`
  font-size: 16px;
`;

const CartFooter = styled.div`
  margin-top: 3em;
`;

const OrderSummary = styled.div`
  margin-top: -10px;
`;

const Info = styled.div`
  background: #f6f6f6;
  padding: 2em;
  margin: 2.5em 0;
  width: 350px;
`;

const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
  font-weight: 800;
  font-size: 20px;
  margin: 2em 0;
`;

const Discount = styled.div`
  margin-bottom: 2em;
  h4 {
    font-weight: 500;
    font-size: 15px;
    color: black;
  }
  input {
    width: 70%;
    height: 35px;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-right: 2em;
  }
`;

const Logos = styled.div`
  margin-top: 0.6em;
  display: flex;
  width: 70%;
  justify-content: space-between;
`;

export default Cart;
