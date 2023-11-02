import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import cartReducer from './cartSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedUserReducer = persistReducer(persistConfig, userReducer)

export const store =  configureStore({
    reducer: {
        user: persistedUserReducer,
        cart: cartReducer
    },
    middleware: [thunk]
})

export const persistor = persistStore(store)