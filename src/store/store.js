// Import modules.
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Import reducers.
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";

const rootReducer = combineReducers({
  products: persistReducer({ key: "products", storage }, productsReducer),
  cart: persistReducer({ key: "cart", storage }, cartReducer)
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);