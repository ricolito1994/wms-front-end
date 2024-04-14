import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import persistConfig from 'store/redux-persist';
import authReducer from 'slice/AuthSlice';
import userReducer from 'slice/UserSlice';

const rootPersistReducer = combineReducers({
  auth: authReducer, 
  user: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootPersistReducer);

export default persistedReducer;