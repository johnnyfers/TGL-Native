import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { theme } from '../../global/theme'
import { styles } from './style'

import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../../store/cart-slice'

import { gamesActions } from '../../store/games-slice'


type RootState = {
    cart: {
        cartItem: {
            game_id: number,
            idKey: string
            numbers: number[] | string
            total_price: number
            type: string
            color: string
        }[],
        totalPrice: number
    }
}


export function Cart() {
    const dispatch = useDispatch()

    let cartItem: {
        game_id: number,
        idKey: string
        numbers: number[] | string
        total_price: number
        type: string
        color: string
    }[] = useSelector((state: RootState) => state.cart.cartItem)

    let totalPrice: number = useSelector((state: RootState) => state.cart.totalPrice)

    function closeCart() {
        dispatch(cartActions.closeCart())
    }

    function deleteRow(idKey: string, total_price: number) {
        dispatch(cartActions.deleteItemFromCart({ idKey, total_price }))
    }

    const saveGame = (game: {}[]) => {
        if (totalPrice < 30) {
            console.log('Jogo não salvo')
            return
        }

        dispatch(gamesActions.receiveDataFromCart({ game }))
        dispatch(cartActions.clearCart())

        console.log('jogo salvo')
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Ionicons
                    onPress={closeCart}
                    style={styles.close}
                    name="close" size={30}
                    color={theme.colors.secondary10}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                    <Ionicons
                        name="cart-outline"
                        size={30}
                        color={theme.colors.secondary10}
                    />
                    <Text style={styles.title}>CART</Text>
                </View>

                <View>
                    <ScrollView style={styles.scroll}>
                    {cartItem.map((item: {
                    game_id: number
                    idKey: string
                    numbers: number[] | string
                    total_price: number
                    type: string
                    color: string
                }) =>
                    <Text>{item.total_price}</Text>)
                }
                    </ScrollView>
                </View>

                <View style={styles.total}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.item1}>CART</Text>
                        <Text style={styles.item2}>TOTAL:</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.item1}>R$</Text>
                        <Text style={styles.item2}>{totalPrice.toFixed(2).replace('.', ',')}</Text>
                    </View>
                </View>
            </View>

            <RectButton style={styles.saveButton} onPress={(): void => saveGame(cartItem)}>
                <Text style={styles.saveButtonText}>
                    SAVE
                </Text>
                <Ionicons
                    name="arrow-forward-outline"
                    size={34}
                    color={theme.colors.secondary10}
                />
            </RectButton>

        </View>
    )
}
