import { reset } from './../../../node_modules/colorette/index.d';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Card {
    id: number;
    modifierId: number;
}

interface Modifier {
    id: number;
    modifierFunction: (value: number) => number;
}

interface UpgradeState {
    diceAmmount: number;
    diceModifier: number;
    cardammount: number;
    cardmodifier: [number, number][];
    opponentLevel: number;
    cards: Card[];
}

const initialState: UpgradeState = {
    diceAmmount: 1,
    diceModifier: 1,
    cardammount: 0,
    cardmodifier: [[3, 6], [2, 3]], // [kerroin, luku]
    opponentLevel: 0,
    cards: [],
};

export const upgradesSlice = createSlice({
    name: 'upgrades',
    initialState,
    reducers: {
        incrementDice: (state) => {
            state.diceAmmount += 1;
        },
        decrementDice: (state) => {
            state.diceAmmount -= 1;
        },
        incrementDiceByAmount: (state, action: PayloadAction<number>) => {
            state.diceAmmount += action.payload;
        },
        incrementDiceModifier: (state) => {
            state.diceModifier += 1;
        },
        decrementDiceModifier: (state) => {
            state.diceModifier -= 1;
        },
        incrementDiceModifierByAmmount: (state, action: PayloadAction<number>) => {
            state.diceModifier += action.payload;
        },
        incrementCardAmmount: (state) => {
            state.cardammount += 1;
        },
        decrementCardAmmount: (state) => {
            state.cardammount -= 1;
        },
        incrementOpponentLevel: (state) => {
            state.opponentLevel += 1;
        },
        addCard: (state, action: PayloadAction<number>) => {
            const cardId = action.payload;
            if (state.cards.length < 5 && !state.cards.some(card => card.id === cardId)) {
                state.cards.push({ id: cardId, modifierId: 1 }); // Oletusmodifier ID
            }
        },
        removeCard: (state, action: PayloadAction<number>) => {
            const cardId = action.payload;
            state.cards = state.cards.filter(card => card.id !== cardId);
        },
        setModifier: (state, action: PayloadAction<{ cardId: number, modifierId: number }>) => {
            const { cardId, modifierId } = action.payload;
            const card = state.cards.find(card => card.id === cardId);
            if (card) {
                card.modifierId = modifierId;
            }
        },
        resetUpgrades: (state) => {
            state.diceAmmount = 1;
            state.diceModifier = 1;
            state.cardammount = 0;
            state.opponentLevel = 0;
            state.cards = [];
        },
    },
});

export const {
    incrementDice,
    decrementDice,
    incrementDiceByAmount,
    incrementDiceModifier,
    decrementDiceModifier,
    incrementDiceModifierByAmmount,
    incrementCardAmmount,
    decrementCardAmmount,
    addCard,
    removeCard,
    setModifier,
    resetUpgrades,
} = upgradesSlice.actions;

export default upgradesSlice.reducer;
