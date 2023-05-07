import { configureStore, createSlice } from "@reduxjs/toolkit";
import { IAuthorizedUser } from '../api/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: IAuthorizedUser = {
    id: '',
    login: '',
    password: '',
    name: '',
    surname: '',
    bio: ''
};

export const AuthUser = createSlice({
    name: 'User',
    initialState,
    reducers: {
        updateData(state, action: PayloadAction<IAuthorizedUser>){
            return action.payload;
        }
    }
});

export default AuthUser.reducer;
export const {updateData} = AuthUser.actions;