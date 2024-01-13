export const login = (userData) => ({
  type: "LOGIN",
  payload: userData,
});

export const fetchProducts = (products) => ({
  type: "FETCH_PRODUCTS",
  payload: products,
});

export const addToCart = (product) => ({
  type: "ADD_TO_CART",
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: "REMOVE_FROM_CART",
  payload: productId,
});
