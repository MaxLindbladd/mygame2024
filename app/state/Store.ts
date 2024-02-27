import { UserData } from './../../node_modules/@expo/config/build/getUserState.d';
import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './slices/example';
import upgradesReducer from './slices/upgrades';
import UserDataReducer from './slices/userData';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        upgrades: upgradesReducer,
        UserData: UserDataReducer,
    },
    });


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
