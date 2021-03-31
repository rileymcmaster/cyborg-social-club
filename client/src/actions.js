export const addCartProduct = (product) => ({
  type: "ADD_CART_PRODUCT",
  product,
});

export const removeProduct = (productId) => ({
  type: "REMOVE_CART_PRODUCT",
  productId,
});

export const updateQuantity = (product, newQuantity) => ({
  type: "UPDATE_CART_PRODUCT_QUANTITY",
  product,
  newQuantity,
});
