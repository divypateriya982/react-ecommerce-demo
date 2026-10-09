import { loadProduct } from "../reducers/productSlice";
import axios from "../../api/axiosConfig";
import { toast } from "react-toastify";

export const asyncLoadProduct = (currentPage) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/products?_page=${currentPage}&_per_page=8`);
        await dispatch(loadProduct({ products: data.data, totalPages: data.pages, currentPage }));
    } catch (error) {
        console.error(error);
    }
};

export const asyncCreateProduct = (product) => async (dispatch, getState) => {
    try {
        await axios.post("/products", product);

        const { data: pagination } = await axios.get('/products?_page=1&_per_page=8');
        const lastPage = pagination.pages;

        await dispatch(asyncLoadProduct(lastPage));
        toast.success("Product is created successfully");
    } catch (error) {
        console.error(error);
    }
};

export const asyncUpdateProduct = (product, id, currentPage) => async (dispatch) => {
    try {
        await axios.patch(`/products/${id}`, product);
        await dispatch(asyncLoadProduct(currentPage));
        toast.success("Product updated successfully");
    } catch (error) {
        console.error(error);
    }
};

export const asyncDeleteProduct = (id, currentPage) => async (dispatch) => {
    try {
        await axios.delete("/products/" + id);
        await dispatch(asyncLoadProduct(currentPage));
        toast.error("Product deleted successfully");
    } catch (error) {
        console.error(error);
    }
};
