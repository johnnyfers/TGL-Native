import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


type ItemsType = {
    cartItem: {}[],
    cartItemFiltered: {}[]
}

const initialState: ItemsType = {
    cartItem: [],
    cartItemFiltered: []
}

const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        filterGames(state, action) {
            const gamesFiltered: {}[] = action.payload.games
            const id: number = action.payload.id

            state.cartItemFiltered = gamesFiltered.filter((games: any) => games.games.id === id)
        },

        clearFilter(state) {
            state.cartItemFiltered = []
        }
    }
})

export const gamesActions = gamesSlice.actions

export default gamesSlice