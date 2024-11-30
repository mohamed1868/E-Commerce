import { configureStore , combineReducers} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import Card from "./Card";

import storage from 'redux-persist/lib/storage' 
 
const persistConfig = {
   key: 'Card',
   storage,
   whitelist:['items']
 }
 const rootReducer = combineReducers({
  
   Card : persistReducer(persistConfig , Card ) ,
 })



export const store = configureStore({
   reducer: rootReducer, 
   middleware : (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

const persistsStore = persistStore(store)

export {persistsStore}