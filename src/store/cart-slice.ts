import { createSlice } from '@reduxjs/toolkit'

type ItemsType = {
    cartItem: {
        game_id: number,
        idKey: string
        numbers: number[] | string
        total_price: number
        type: string
        color: string
        date_string: string
    }[],
    totalPrice: number,
    displayCart: boolean
}

const initialState: ItemsType = {
    cartItem: [],
    totalPrice: 0,
    displayCart: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        receiveDataFromNewBEt(state, action) {
            const numbersGame: number[] = action.payload.numbersGame
            const price: number = action.payload.gamePrice
            const name: string = action.payload.gameName
            const color: string = action.payload.color
            const gameId: number = action.payload.gameId

            let id = Math.random().toString()

            let date = new Date();
            let dateString = date.getDate() + "/0" + (date.getMonth() + 1) + "/" + date.getFullYear();

            state.totalPrice += price

            state.cartItem.push({
                game_id: gameId,
                idKey: id,
                numbers: numbersGame.toString(),
                total_price: price,
                type: name,
                color: color,
                date_string: dateString
            })
        },

        deleteItemFromCart(state, action) {
            const id = action.payload.idKey
            const price = action.payload.total_price

            state.totalPrice -= price

            state.cartItem = state.cartItem.filter(item => item.idKey !== id)
        },

        clearCart(state) {
            state.totalPrice = 0
            state.cartItem = []
        },

        showCart(state){
            state.displayCart = true
        },

        closeCart(state){
            state.displayCart = false
        }
    }
})

export const cartActions = cartSlice.actions

export default cartSlice