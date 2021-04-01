import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header/";
import Signin from "./Signin";
import Products from "./Products";
import Footer from "./Footer";
import Form from "./Form";
import GlobalStyles from "../GlobalStyles";
import ProductGrid from "./ProductGrid";
import ProductPage from "./ProductPage";
import HomePage from "./HomePage";

import FilterProduct from "./FilterProduct";
import Cart from "./Cart";



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
            <Cart />
          </Route>
          <Route exact path="/item/:id">
            <ProductPage />
          </Route>
          <Route exact path="/signin">
            <Signin />
          </Route>
          <Route exact path="/category/:category">
            <FilterProduct />
          </Route>
          <Route exact path="/form">
            <Form />
          </Route>
          <Route exact path="/sign-in">
            <Signin />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
