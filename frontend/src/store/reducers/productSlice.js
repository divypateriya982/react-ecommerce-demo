import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        // products: [],
        // totalPages: 0,
        // currentPage: 1
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
            // const {} = action.payload;

            // if (products !== undefined) {
            //     // console.log('products changing');
            //     state.products = products;
            // }
            // if (totalPages !== undefined) {
            //     // console.log('totalPages changing');
            //     state.totalPages = totalPages;
            // }
            // if (currentPage !== undefined) {
            //     // console.log("currentPage changing");
            //     state.currentPage = currentPage;
            // }
        },
        resetCurrentPage: (state) => {
            state.currentPage = 1
        }
    }
});

export const { loadProduct, resetCurrentPage } = productSlice.actions
export default productSlice.reducer