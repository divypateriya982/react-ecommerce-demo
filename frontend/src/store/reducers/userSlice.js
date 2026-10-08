import { createSlice } from '@reduxjs/toolkit';

const getInitialUser = () => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    return savedUser ? savedUser : null;
}

const initialState = {
    user: getInitialUser()
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadUser: (state, action) => {
            state.user = action.payload;
        },
        removeUser: (state) => {
            state.user = null;
        }
    }
});

export const { loadUser, removeUser } = userSlice.actions
export default userSlice.reducer
