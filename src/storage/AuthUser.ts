import { configureStore, createSlice } from "@reduxjs/toolkit";
import { IAuthorizedUser, IUser } from '../api/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: IAuthorizedUser = {
    id: '',
    token: '',
    data: undefined 
};

export const AuthUser = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IAuthorizedUser>){
            sessionStorage.setItem('token', action.payload.token);
            sessionStorage.setItem('id', action.payload.id);
            return action.payload;
        },
        setUserData(state, action: PayloadAction<IUser>){
            console.log(action.payload)
            return {...state, data: action.payload}
        }
    }
});

export default AuthUser.reducer;
export const {setUser, setUserData} = AuthUser.actions;