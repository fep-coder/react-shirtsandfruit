import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [] };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItemIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );

            if (existingItemIndex !== -1) {
                state.cartItems[existingItemIndex].quantity += 1;
            } else {
                state.cartItems.push(action.payload);
            }

            localStorage.setItem("cart", JSON.stringify(state));
        },
    },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
