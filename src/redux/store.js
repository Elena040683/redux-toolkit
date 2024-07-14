import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import { productsList, productFilter } from './products/reducers';
import logger from 'redux-logger';

import { 
  persistStore, 
  persistReducer, 
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'products',
  version: 1,
  storage,
  whitelist: ['products'],
};

const productReducer = combineReducers({
  products: productsList,
  filter: productFilter
});

const persistedProductReducer = persistReducer(persistConfig, productReducer);

export const store = configureStore({
  reducer: persistedProductReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

export const persistor = persistStore(store);