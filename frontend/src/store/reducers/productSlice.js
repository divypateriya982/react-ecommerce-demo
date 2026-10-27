import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: {
            productsData: [],
            totalPages: 0,
            currentPage: 1
        }
    },
    reducers: {
        loadProduct: (state, action) => {
            const { productsData, currentPage, totalPages } = action.payload;
            state.products.productsData = productsData;
            state.products.currentPage = currentPage;
            state.products.totalPages = totalPages;
        },
        resetCurrentPage: (state) => {
            state.currentPage = 1
        }
    }
});

export const { loadProduct, resetCurrentPage } = productSlice.actions
export default productSlice.reducer