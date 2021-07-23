import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { theme } from '../../global/theme'
import { styles } from './style'

import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../../store/cart-slice'

import { gamesActions } from '../../store/games-slice'
import { GameCard } from '../GameCard'
import { Modal } from '../Modal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

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
    let date = new Date();
    let dateString = date.getDate() + "/0" + (date.getMonth() + 1) + "/" + date.getFullYear();
    
    const dispatch = useDispatch()

    const [modalColor, setModalColor] = useState('')
    const [modalTitle, setModalTitle] = useState('')
    const [message, setmessage] = useState('')
    const [showAlert, setShowAlert] = useState(false)

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

    async function saveGame(game: {}[]) {
        const token = await AsyncStorage.getItem('@token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        if (totalPrice < 30) {
            displayAlert(
                'you need a minimal value of R$30,00 to save your bets',
                'Error :(',
                'red'
            )
            return
        }

        axios.post(
            'http://192.168.0.104:8000/bets', {
            bets: game
        },
            config
        )
            .then(() => {
                return displayAlert(
                    'Your game was saved!!!',
                    'Success :)',
                    theme.colors.secondary10
                )
            })
            .catch((err) => {
                return displayAlert(
                    'you need a minimal value of R$30,00 to save your bets',
                    'Error :(',
                    'red'
                )
            })

        dispatch(gamesActions.receiveDataFromCart({ game }))
        dispatch(cartActions.clearCart())
    }

    function displayAlert(message: string, title: string, color: string) {
        setModalTitle(title)
        setModalColor(color)
        setmessage(message)

        setShowAlert(true)
    }

    function hideAlert() {
        setShowAlert(false)
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
                            <GameCard
                                key={item.idKey}
                                type={item.type}
                                price={item.total_price}
                                color={item.color}
                                numbers={item.numbers}
                                date={dateString}
                                deleteRow={(): void => deleteRow(item.idKey, item.total_price)}
                            />)
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

            <RectButton style={styles.saveButton} onPress={(): Promise<void> => saveGame(cartItem)}>
                <Text style={styles.saveButtonText}>
                    SAVE
                </Text>
                <Ionicons
                    name="arrow-forward-outline"
                    size={34}
                    color={theme.colors.secondary10}
                />
            </RectButton>
            <Modal
                title={modalTitle}
                color={modalColor}
                showAlert={showAlert}
                callback={hideAlert}
                message={message}
            />
        </View>
    )
}
