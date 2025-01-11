"use client"

import React from "react"
import { Provider } from "react-redux"
import { persistor, store } from "./store"
import { PersistGate } from "redux-persist/integration/react"
import { SessionProvider } from "next-auth/react"
// import { PersistGate } from "redux-persist/integration/react"

export function ReduxProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SessionProvider>{children}</SessionProvider>
            </PersistGate>
        </Provider>
    )
}
