import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import pcBuilderReducer from '../redux/features/pcBuilderSlice';
import { api } from "./api/apiSlice";
import userSlice from "./features/user/userSlice";
/////////////////////persisting
const persistConfig = {
  key: "root",
  version: 1,
  storage
};

const reducer = combineReducers({
  cartComponents: pcBuilderReducer,
  userData: userSlice,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
///////
const store = configureStore({
  // reducer: persistedReducer
  reducer: {
    cartComponents: pcBuilderReducer,
    userData: userSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store
