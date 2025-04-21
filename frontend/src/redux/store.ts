import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { menuReducer } from "./slice/MenuSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice/userSlice";
import { cartReducer } from "./slice/cartSlice";


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["menuReducer", "userReducer", "cartReducer"],
};


const rootReducer = combineReducers({
  menuReducer,
  userReducer,
  cartReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;