export const addCartProduct = (product) => ({
  type: "ADD_CART_PRODUCT",
  product,
});

export const removeItem = (productId) => ({
  type: "REMOVE_CART_PRODUCT",
  productId,
});

export const updateQuantity = (product, newQuantity) => ({
  type: "UPDATE_CART_PRODUCT_QUANTITY",
  product,
  newQuantity,
});

export const signIn = (email, password) => ({

    type: "SIGN_IN",
    email,
    password,
  
});
export const signOut = (userId) => {
  return {
    type: "SIGN_OUT",
  };
};