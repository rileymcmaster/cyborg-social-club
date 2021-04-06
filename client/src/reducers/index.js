import { combineReducers } from "redux";

import cart from "./cart-reducer";
import signin from "./signin-reducer";
import signUp from "./signUp-reducer";
import filter from "./filter-reducer";

export default combineReducers({ cart, signin, signUp, filter });
