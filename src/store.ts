import { configureStore } from "@reduxjs/toolkit";
import vacansiesSlice from "./features/vacancies/vacancies";

export const store = configureStore({
  reducer: {
    vacancies: vacansiesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
