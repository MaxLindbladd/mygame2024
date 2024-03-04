import { reset } from './../../../node_modules/colorette/index.d';

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserDataState {
    throws: number
    money: number
    opponentLevel: number
}


const UserDataState  = {
    throws: 5,
    money: 0,
    opponentLevel: 1
    
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
            
        },
        incrementOpponentLevel: (state) => {
            state.opponentLevel += 1
        },
        resetOpponentLevel: (state) => {
            state.opponentLevel = 1
            state.money = 0
        },

        

    },
})

export const { incrementthrows, decrementthrows, incrementByAmount, incrementMoneyByAmmount, decrementMoneyByAmmount, resetThrows, incrementOpponentLevel, resetOpponentLevel  } = UserDataSlice.actions

export default UserDataSlice.reducer

