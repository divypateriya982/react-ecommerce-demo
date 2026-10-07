import axios from '../../api/axiosConfig';
import { loadCart } from '../reducers/cartSlice';
import { toast } from 'react-toastify';

export const asyncLoadCart = () => async (dispatch) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user === null) return;
        const { data } = await axios.get(`/carts?userId=${user.id}`);
        dispatch(loadCart(data));
    }
    catch (error) {
        console.error(error);
    }
}

export const asyncCreateCart = (cart) => async (dispatch) => {
    try {
        await axios.post('/carts', cart);
        dispatch(asyncLoadCart());
        toast.success('Item added to cart');
    }
    catch (error) {
        console.error(error);
    }
}

export const asyncUpdateCart = (id, cart) => async (dispatch) => {
    try {
        await axios.patch(`/carts/${id}`, cart);
        dispatch(asyncLoadCart());
        toast.success('Product quantity increased');
    }
    catch (error) {
        console.error(error);
    }
}

export const asyncDeleteCart = (id) => async (dispatch) => {
    try {
        await axios.delete('/carts/' + id);
        dispatch(asyncLoadCart());
        toast.error('Item removed from cart');
    }
    catch (error) {
        console.error(error);
    }
}