import 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'auth',
    'user',
  ], 
};

export default persistConfig;