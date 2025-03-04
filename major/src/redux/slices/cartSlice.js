import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cartItems: [] },
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.cartItems.find(item => item._id === action.payload._id);
      if (!itemExists) {
          state.cartItems.push({ ...action.payload, quantity: 1 });
      } else {
          itemExists.quantity += 1;
      }
  },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
