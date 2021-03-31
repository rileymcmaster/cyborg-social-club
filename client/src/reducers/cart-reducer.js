const initialState = {};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_CART_PRODUCT": {
      console.log(action);
      return {
        ...state,
        [action.product.id]: {
          ...action.product,
        },
      };
    }
    default:
      return state;
  }
}
