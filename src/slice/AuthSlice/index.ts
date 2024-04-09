import { PayloadAction, createSlice } from "@reduxjs/toolkit";

/* interface AuthState  {
    value: {
        access_token: string,
        token_type: string
        expires_in: number
    }
} */

const initialState = {
    value: null
}

const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<any>) => {
            state.value = action.payload;
        },
        clearToken(state) {
            state.value = null;
        },
    },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;