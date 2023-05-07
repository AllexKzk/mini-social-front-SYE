import { configureStore } from "@reduxjs/toolkit"
import AuthUser from "./AuthUser"

export const store = configureStore({ reducer: AuthUser });
