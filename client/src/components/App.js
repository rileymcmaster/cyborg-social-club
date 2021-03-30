import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Signin from "./Signin";
import Products from "./Products";
import Footer from "./Footer";

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
      <Header />
      <Router>
        <Switch>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/item/:id"></Route>
          <Route exact path="/signin">
            <Signin />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </>
    // {/* <div>{items ? items[0].name : `...where's my stuff eh?...`}</div>
    // <div>{companies ? companies[0].name : `...where's my stuff eh?...`}</div>

    // <div>Is's all gone</div> */}
  );
}

export default App;
