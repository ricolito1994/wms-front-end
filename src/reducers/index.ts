import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from 'slice/AuthSlice'; // Import your slice reducer(s)
import persistConfig from 'store/redux-persist'; // Import Redux Persist config

const rootPersistReducer = combineReducers({
  token: authReducer, // Add your slice reducer(s) here
});

const persistedReducer = persistReducer(persistConfig, rootPersistReducer);

export default persistedReducer;