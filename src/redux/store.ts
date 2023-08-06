import pcBuilderReducer from '@/redux/features/pcBuilderSlice';
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    component: pcBuilderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store
