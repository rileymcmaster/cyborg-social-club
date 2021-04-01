const initialState = {};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_CART_PRODUCT": {
      console.log(action);
      console.log(action.product._id);
      return {
        ...state,
        [action.product._id]: {
          ...action.product,
          quantity: 1,
        },
      };
    }
    case "UPDATE_CART_PRODUCT_QUANTITY": {
      return {
        ...state,
        [action.product._id]: {
          ...action.product,
          quantity: action.newQuantity,
        },
      };
    }

    case "REMOVE_CART_PRODUCT": {
      const stateCopy = { ...state };
      delete stateCopy[action.productId];
      return stateCopy;
    }
    default:
      return state;
  }
}
