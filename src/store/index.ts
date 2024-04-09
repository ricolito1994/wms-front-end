
import persistedReducer from 'reducers'; // Import your persisted reducer
import { persistStore } from 'redux-persist';
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    /* reducer: {
        auth : authSliceReducer
    } */
    reducer: persistedReducer
})
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;