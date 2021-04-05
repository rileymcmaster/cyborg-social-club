import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header/";
import Signin from "./Signin";
import Products from "./Products";
import Footer from "./Footer";
import CheckoutPage from "../components/Checkout/CheckoutPage";
import GlobalStyles from "../GlobalStyles";
import ProductGrid from "./ProductGrid";
import ProductPage from "./ProductPage";
import HomePage from "./HomePage";
import SignUp from "./SignUp";

import FilterProduct from "./FilterProduct";
import Cart from "./Cart";
import ErrorPage from "./ErrorPage";

function App() {
  // const [companies, setCompanies] = useState(null);
  // //determine where the fetch will go
  // useEffect(() => {
  //   fetch("/companies")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setCompanies(data.data);
  //     });
  // }, []);

  const [cart, setCart] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              setCart={setCart}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
          </Route>
          <Route exact path="/item/:id">
            <ProductPage />
          </Route>
          <Route exact path="/sign-in">
            <Signin cart={cart} />
          </Route>
          <Route exact path="/category/:category">
            <FilterProduct />
          </Route>
          <Route exact path="/form">
            <CheckoutPage totalPrice={totalPrice} cart={cart} />
          </Route>
          <Route exact path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/">
            <ErrorPage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
