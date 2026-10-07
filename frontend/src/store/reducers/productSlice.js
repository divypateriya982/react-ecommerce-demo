import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        totalPages: null,
        currentPage: 1
    },
    reducers: {
        loadProduct: (state, action) => {
            const { products, totalPages, currentPage } = action.payload;

            if (products !== undefined) state.products = products;
            if (totalPages !== undefined) state.totalPages = totalPages;
            if (currentPage !== undefined) state.currentPage = currentPage;
        }
    }
});

export const { loadProduct } = productSlice.actions
export default productSlice.reducer