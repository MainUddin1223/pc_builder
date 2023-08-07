import { configureStore } from "@reduxjs/toolkit";
import pcBuilderReducer from '../redux/features/pcBuilderSlice';

const store = configureStore({
  reducer: {
    component: pcBuilderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store
