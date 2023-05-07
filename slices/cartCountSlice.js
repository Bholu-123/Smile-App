// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   value: [],
// };

// export const counterSlice = createSlice({
//   name: "counter",
//   initialState,
//   reducers: {
//     increment: (state, action) => {
//       // Redux Toolkit allows us to write "mutating" logic in reducers. It
//       // doesn't actually mutate the state because it uses the Immer library,
//       // which detects changes to a "draft state" and produces a brand new
//       // immutable state based off those changes
//       //   state.value += 1
//       state.value = [...state.value, action.payload];
//     },
//     decrement: (state, action) => {
//       //find index of the given product id, remove that one indexed product from cart
//       const cartItems = [...state.value];
//       const index = state.value.findIndex((item) => item.id === action.payload);
//       if (index >= 0)
//         cartItems.splice(index, 1); // removing 1 product from index "index"
//       else console.warn("not hungry???");
//       state.value = cartItems;
//     },
//     incrementByAmount: (state, action) => {
//       state.value += action.payload;
//     },

//     resetToZero: (state, action) => {
//       state.value = action?.payload;
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount, resetToZero } =
//   counterSlice.actions;

// export const addItemsToCart = (state) => state.counter.value;
// export const addItemsToCartWithId = (state, id) =>
//   state.counter.value.filter((item) => item.id === id);
// // const initialValue = 0;
// export const cartItemPrice = (state) =>
//   state.counter.value.reduce((total, item) => (total += item.price), 0);

// export default counterSlice.reducer;
