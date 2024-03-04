
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
    value: number
}


const CounterState  = {
    value: 0,
    }


export const counterSlice = createSlice({
    name: 'counter',
    initialState: CounterState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            if (state.value > 0) {
                state.value -= 1
            }
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
    },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer

