import React, { createRef, useEffect, useRef, useState } from "react";
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
import { useMediaQuery } from "../../components/useMediaQuery";

const Cart = ({ totalPrice, setTotalPrice }) => {
  const [couponCode, setCouponCode] = useState(null);
  const [discountValue, setDiscountValue] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const cart = useSelector((state) => state.cart);
  const guestUserState = useSelector((state) => Object.values(state.cart));
  console.log(guestUserState);
  const loggedInState = useSelector((state) => state.signin);
  console.log(loggedInState);
  const loggedInCart = Object.values(loggedInState.cart);
  let isPageWide = useMediaQuery("(min-width: 900px)");
  // setCart(loggedInCart);

  let cartMap = [];

  useEffect(() => {
    let discountedPrice = totalPrice - discountValue;
    let formattedDiscountedPrice = parseFloat(discountedPrice).toFixed(2);
    setTotalPrice(formattedDiscountedPrice);
  }, [discountValue]);

  if (guestUserState.length !== 0 && discountValue === 0) {
    const prices = guestUserState.map((product) =>
      Number(product.price.slice(1))
    );
    const quantities = guestUserState.map((product) =>
      Number(product.quantity)
    );
    const subtotals = prices.map((price, index) => price * quantities[index]);

    const calculatedTotalPrice = subtotals.reduce(
      (accumulator, currentValue) => {
        return (accumulator = accumulator + currentValue);
      }
    );
    const formattedTotalPrice = parseFloat(calculatedTotalPrice).toFixed(2);
    setTotalPrice(formattedTotalPrice);
  } else if (guestUserState.length === 0) {
    setTotalPrice(0);
  }

  const handleCouponSubmit = () => {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ couponCode }),
    };

    if (totalPrice !== 0) {
      fetch("applydiscount", requestOptions)
        .then((res) => res.json())
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            // console.log(res.value);
            setDiscountValue(res.value);
            setCouponMessage(
              `You are one lucky Cyborg, you saved ${res.value}$ today!`
            );
            // console.log(discountValue);
          } else if (res.status === 400) {
            setCouponMessage(
              "The coupon code you provide is either invalid or has expired."
            );
            console.log(couponMessage);
          }
        });
    } else {
      setCouponMessage(
        "Please add items to your cart before applying your coupon."
      );
    }
  };
  return isPageWide ? (
    <CartWrapper>
      <CartDetails>
        <CartHeader>
          <h1>Your Cart</h1>
          <div>You have {guestUserState.length} items in your cart</div>
          <CartHeadings>
            <Heading>Product</Heading>
            <Heading style={{ marginLeft: "370px" }}>Quantity</Heading>
            <Heading style={{ marginRight: "20px" }}>Subtotal</Heading>
          </CartHeadings>
        </CartHeader>
        <div>
          {loggedInState.isSignedIn
            ? loggedInCart.map((product) => {
                console.log(product);
                return <CartItem product={product} />;
              })
            : guestUserState.map((product) => {
                console.log(product);
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
          <p style={{ fontSize: "15px" }}>Free shipping within Canada.</p>
        </Info>
        <CartTotal>
          <div>Total:</div>
          <div>$CAD {totalPrice} </div>
        </CartTotal>
        <Discount>
          <h4>Discount code</h4>
          {<Notification>{couponMessage} </Notification>}
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
                setCouponCode(ev.target.value);
              }}
            />
            <Button
              disabled={couponCode ? (discountValue ? true : false) : true}
              style={{ width: "30%", margin: "0" }}
              onClick={handleCouponSubmit}
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
  ) : (
    //MOBILE
    <CartWrapper style={{ flexDirection: "column" }}>
      <CartDetails>
        <CartHeader>
          <h1>Your Cart</h1>
          <div>You have {guestUserState.length} items in your cart</div>
          <CartHeadings>
            <Heading>Product</Heading>
          </CartHeadings>
        </CartHeader>
        <div>
          {loggedInState.isSignedIn
            ? loggedInCart.map((product) => {
                console.log(product);
                return <CartItem product={product} />;
              })
            : guestUserState.map((product) => {
                console.log(product);
                return <CartItem product={product} />;
              })}
        </div>
        <CartFooter>{/* <h2>Items related to your order</h2> */}</CartFooter>
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
          <p style={{ fontSize: "15px" }}>Free shipping within Canada.</p>
        </Info>
        <CartTotal>
          <div>Total:</div>
          <div>$CAD {totalPrice} </div>
        </CartTotal>
        <Discount>
          <h4>Discount code</h4>
          {<Notification>{couponMessage} </Notification>}
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
                setCouponCode(ev.target.value);
              }}
            />
            <Button
              disabled={couponCode ? (discountValue ? true : false) : true}
              style={{ width: "30%", margin: "0" }}
              onClick={handleCouponSubmit}
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
  width: 60vw;
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

const Notification = styled.div`
  background: lightgray;
`;
export default Cart;
