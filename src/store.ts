import { combineReducers, configureStore } from "@reduxjs/toolkit";
import vacansiesSlice from "./features/vacancies/vacancies";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  vacancies: vacansiesSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["vacancies"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Игнорируем действия redux-persist (чтобы не было ошибок)
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
