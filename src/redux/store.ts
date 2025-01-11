import { configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import reducer from "./reducer"
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from "redux-persist"

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["savedLongitude", "savedLatitude"],
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: {
        user: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
    // middleware: [thunk],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
