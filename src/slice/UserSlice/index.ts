import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserModel } from 'models/user.model'
import UserService from "services/UserService";

interface UserState  {
    loading: boolean,
    data: UserModel | null
    error: boolean
}

const initialState: UserState = {
    loading: false,
    data : null,
    error : false,
}

const userSlice = createSlice ({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserModel>) => {
            state.data = action.payload;
        },
        clearUser(state) {
            state.data = null;
        },
    },
    extraReducers : (builder) => {
        builder
            .addCase(userAsync.pending, (state:any) => {
                state.loading = true;
            })
            .addCase(userAsync.fulfilled, (state:any, payload: PayloadAction<UserModel>) => {
                state.loading = false;
                state.data = payload.payload;
            })
            .addCase(userAsync.rejected, (state:any) => {
                state.loading = false;
                state.error = true;
            })
    }
});

export const userAsync = createAsyncThunk(
    "user/userAsync", 
    async (accessToken: String) => {
        let userData = await (new UserService(accessToken)).myself();
        return userData;
    }
);

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;