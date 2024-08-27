import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalPrice: 0,
    cartProducts: [],
  },
  reducers: {
    addProduct: (state, action) => {
      if (state.cartProducts.find((product) => product.id === action.payload.id)) {
        const productIndex = state.cartProducts.findIndex(
          (product) => product.id === action.payload.id
        );
        state.cartProducts[productIndex].quantity += 1;
      } else {
        state.cartProducts.push({ ...action.payload, quantity: 1 });
      }

      state.totalPrice += +action.payload.price;
    },
    removeProduct: (state, action) => {
      const productIndex = state.cartProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      const productPrice = state.cartProducts[productIndex].price;
      state.totalPrice -= productPrice;
      if (productIndex > -1) {
        if (state.cartProducts[productIndex].quantity > 1) {
          state.cartProducts[productIndex].quantity -= 1;
        } else {
          state.cartProducts.splice(productIndex, 1);
        }
      }
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
