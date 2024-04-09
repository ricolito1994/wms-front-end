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

const userSlice = createSlice ({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.value = action.payload;
        },
        clearUser(state) {
            state.value = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;