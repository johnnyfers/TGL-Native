import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { SelectGameButton } from '../../components/SelectGameButton'
import { theme } from '../../global/theme'
import { newbetActions } from '../../store/newbet-slice'
import { styles } from './style'
import { ItemTypes } from '../../interfaces/ItemTypes'
import { RectButton } from 'react-native-gesture-handler'

let myArray: any[] = []

interface RootState {
    newBet: {
        items: number[],
        color: string
    },
    cart: {
        cartItem: {}[]
    }
}

export function NewBet() {
    let myItems: number[] = useSelector((state: RootState) => state.newBet.items)

    const dispatch = useDispatch()

    const [gameDescription, setGameDescription] = useState('')
    const [gameName, setGameName] = useState('')
    const [gameRange, setGameRange] = useState(0)
    const [gamePrice, setGamePrice] = useState(0)
    const [gameColor, setGameColor] = useState('')
    const [gameMaxNumber, setGameMaxNumber] = useState(0)
    const [gameId, setGameId] = useState(0)
    const [items, setItems] = useState([])
    const [showBetButtons, setShowBetButtons] = useState(false)

    useEffect(() => {
        axios
            .get('http://192.168.0.104:8000/games')
            .then((res) => {
                setItems(res.data)
            })
            .catch(err => console.log(err.message))
    }, [])

    function gameHandler(index: number) {
        clearGame()

        setGameId(items[index]['id'])
        setGameName(items[index]['type'])
        setGameDescription(items[index]['description'])
        setGameRange(items[index]['range'])
        setGamePrice(items[index]['price'])
        setGameColor(items[index]['color'])
        setGameMaxNumber(items[index]['max_number'])
    }

    function clearGame() {
        dispatch(newbetActions.clearGame())
    }
    useEffect(() => {
        if (items.length) {
            gameHandler(0)
        }
    }, [items])

    function selectButtonHandler(
        value: number,
        maxNumber: number,
        gamePrice: number,
        gameName: string,
        gameColor: string
    ) {
        dispatch(newbetActions.addItemToArray({ value, maxNumber, gamePrice, gameName }))
    }

    function draggerHandler() {
        setShowBetButtons((prev) => !prev)
    }

    function Buttons() {
        myArray = []

        for (let i = 1; i <= gameRange; i++) {
            myArray.push(
                <RectButton
                    style={styles.buttonsGame}
                    onPress={() => selectButtonHandler(i, gameMaxNumber, gamePrice, gameName, gameColor)}
                    key={i}
                >
                    <View style={{ ...styles.buttonsGame, backgroundColor: myItems.find(item => item === i) ? gameColor : theme.colors.secondary30 }}>
                        <Text style={styles.gameText}>{i < 10 ? `0${i}` : i}</Text>
                    </View>
                </RectButton>
            )
        }

        return myArray
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                NEW BET FOR {gameName.toLocaleUpperCase()}
            </Text>
            <Text style={styles.subtitle}>Choose a game</Text>
            <View style={styles.buttonsContainer}>
                {items && items.map((item: ItemTypes, index: number) =>
                    <SelectGameButton
                        selectbackground={(gamePrice === item.price) ? item.color : 'transparent'}
                        selectcolor={(gamePrice !== item.price) ? item.color : 'white'}
                        key={index}
                        onPress={() => gameHandler(index)}
                        item={item}
                        index={index}
                    />
                )}
            </View>
            {!showBetButtons &&
                <View>
                    <Text style={{ ...styles.title, fontSize: 18 }}>Fill your Bet</Text>
                    <Text style={{ ...styles.subtitle, fontFamily: theme.fonts.text500 }}>{gameDescription}</Text>
                </View>
            }
            {showBetButtons &&
                <Text>Teste</Text>
            }

            <RectButton
                onPress={draggerHandler}
                style={{ height: 15 }}>
                <View style={styles.dragger}></View>
            </RectButton>

            <ScrollView style={{ ...styles.scrollView }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {items && Buttons()}
                </View>

            </ScrollView>
        </View>
    )
}
