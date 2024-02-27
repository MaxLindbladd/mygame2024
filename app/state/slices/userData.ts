import { reset } from './../../../node_modules/colorette/index.d';

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserDataState {
    throws: number
    money: number
}


const UserDataState  = {
    throws: 5,
    money: 10
    }


export const UserDataSlice = createSlice({
    name: 'UserData',
    initialState: UserDataState,
    reducers: {
        incrementthrows: (state) => {
            state.throws += 1
        },
        decrementthrows: (state) => {
            state.throws -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.throws += action.payload
        },
        incrementMoneyByAmmount: (state, action: PayloadAction<number>) => {
            state.money += action.payload
        },
        decrementMoneyByAmmount: (state, action: PayloadAction<number>) => {
            state.money -= action.payload
        },
        resetThrows: (state) => {
            state.throws = 5
            
        }

    },
})

export const { incrementthrows, decrementthrows, incrementByAmount, incrementMoneyByAmmount, decrementMoneyByAmmount, resetThrows } = UserDataSlice.actions

export default UserDataSlice.reducer

