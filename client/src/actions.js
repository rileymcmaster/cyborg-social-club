export const addCartProduct = (product) => {
  console.log(product);
  return {
    type: "ADD_CART_PRODUCT",

    product,
  };
};

export const removeProduct = (productId) => ({
  type: "REMOVE_CART_PRODUCT",
  productId,
});

export const updateQuantity = (product, newQuantity) => ({
  type: "UPDATE_CART_PRODUCT_QUANTITY",
  product,
  newQuantity,
});

export const signIn = (user) => ({
  type: "SIGN_IN",
  user,
});
export const signOut = (user) => {
  return {
    type: "SIGN_OUT",
  };
};

export const signUp = (user) => ({
  type: "SIGN_UP",
  user,
});

//filters
export const addFilter = (filter) => ({
  type: "ADD_FILTER",
  filter,
});

export const removeFilter = (filter) => ({
  type: "REMOVE_FILTER",
  filter,
});

export const singleFilter = (filter) => ({
  type: "SINGLE_FILTER",
  filter,
});
