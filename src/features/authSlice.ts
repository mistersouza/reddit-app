import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
    isOpen: boolean;
    view: 'login' | 'signup' | 'forgotPassword';
}

const initialState: AuthState = {
    isOpen: false,
    view: 'login',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        openAuthModal: (state, action: PayloadAction<'login' | 'signup' | 'forgotPassword'>) => {
            state.isOpen = true;
            state.view = action.payload;
        },
        closeAuthModal: (state) => {
            state.isOpen = false;
        },
        setAuthView: (state, action: PayloadAction<'login' | 'signup' | 'forgotPassword'>) => {
            state.view = action.payload;
        }   
    },
});

export const { openAuthModal, closeAuthModal, setAuthView } = authSlice.actions;

export default authSlice.reducer;
