import { configureStore } from "@reduxjs/toolkit";

import passwordReducer from './PasswordSlice';

export const store = configureStore({
    reducer: {
        password: passwordReducer,
    },
})