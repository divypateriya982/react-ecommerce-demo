import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        loadCart: (state, action) => {
            state.carts = action.payload;
        },
        removeCart: (state, action) => {
            state.carts = [];
        }
    }
});

export const { loadCart, removeCart } = cartSlice.actions
export default cartSlice.reducer