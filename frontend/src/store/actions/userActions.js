import axios from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import { loadUser, removeUser } from '../reducers/userSlice';

// asyncCurrentUser works as loadUser
export const asyncCurrentUser = () => (dispatch) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) dispatch(loadUser(user));
        else return;
    }
    catch (error) {
        console.error(error);
    }
}

export const asyncRegisterUser = async (user) => {
    try {
        await axios.post('/users', user);
        toast.success('User registered successfully');
    }
    catch (error) {
        console.error(error);
    }
}

export const asyncLoginUser = (user) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/users?email=${user.email}&password=${user.password}`);
        if (data[0]) {
            localStorage.setItem('user', JSON.stringify(data[0]));
            dispatch(asyncCurrentUser());
            toast.success('User logged in successfully');
        }
        else {
            toast.error('Incorrect details!');
        }
    }
    catch (error) {
        console.error(error);
    }
}

export const asyncLogoutUser = () => async (dispatch) => {
    try {
        localStorage.removeItem('user');
        dispatch(removeUser());
        dispatch(asyncCurrentUser());
        toast.error('User logged out successfully');
    }
    catch (error) {
        console.error(error);
    }
}

export const asyncUpdateUser = (user, id) => async (dispatch) => {
    try {
        await axios.patch(`/users/${id}`, user);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(asyncCurrentUser());
        toast.success('User updated successfully');
    }
    catch (error) {
        console.error(error);
    }
}

export const asyncDeleteUser = (id) => async (dispatch) => {
    try {
        await axios.delete('/users/' + id);
        localStorage.removeItem('user');
        dispatch(removeUser());
        dispatch(asyncCurrentUser());
        toast.error('User deleted successfully');
    }
    catch (error) {
        console.error(error);
    }
}