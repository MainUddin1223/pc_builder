import { configureStore } from "@reduxjs/toolkit";
import pcBuilderReducer from '../redux/features/pcBuilderSlice';
import { api } from "./api/apiSlice";
import userSlice from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    cartComponents: pcBuilderReducer,
    userData: userSlice,
    [api.reducerPath]: api.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store
