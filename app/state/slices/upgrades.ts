import { iconName } from './../../../node_modules/@fortawesome/free-solid-svg-icons/fa1.d';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cards } from './../../components/Gamescreencomponents/cards'; // Tuodaan kortit

// Korttien määritelmät
interface Card {
    id: number;
    modifier: number[] | number[][];
    name: string;
    price: number;
    description: string;
    image: null | string; // Oletetaan, että kuvatiedosto on merkkijono tai null-arvo
    rarity: string; // Lisätty harvinaisuuden määrittely
    icon: string; // Lisätty ikonin määrittely
}


interface UpgradeState {
    diceAmmount: number;
    diceModifier: number;
    cardAmount: number;
    opponentLevel: number;
    cards: Card[];
}

// Alustetaan tila
const initialState: UpgradeState = {
    diceAmmount: 1,
    diceModifier: 6,
    cardAmount: 0,
    opponentLevel: 0,
    cards: [],
};

// Luodaan slice
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
        incrementDiceModifierByAmount: (state, action: PayloadAction<number>) => {
            state.diceModifier += action.payload;
        },
        incrementCardAmount: (state) => {
            state.cardAmount += 1;
        },
        decrementCardAmount: (state) => {
            state.cardAmount -= 1;
        },
        incrementOpponentLevel: (state) => {
            state.opponentLevel += 1;
        },
        addCard: (state, action: PayloadAction<Card>) => {
            state.cards.push(action.payload);
            state.cardAmount += 1;
        },
        removeCard: (state, action: PayloadAction<number>) => {
            const cardId = action.payload;
            state.cards = state.cards.filter(card => card.id !== cardId);
            state.cardAmount -= 1;
        },
        resetUpgrades: (state) => {
            state.diceAmmount = 1;
            state.diceModifier = 6;
            state.cardAmount = 0;
            state.opponentLevel = 0;
            state.cards = [];
        },
    },
});

// Viedään reducer ja actions
export const {
    incrementDice,
    decrementDice,
    incrementDiceByAmount,
    incrementDiceModifier,
    decrementDiceModifier,
    incrementDiceModifierByAmount,
    incrementCardAmount,
    decrementCardAmount,
    addCard,
    removeCard,
    resetUpgrades,
    
} = upgradesSlice.actions;

export default upgradesSlice.reducer;
