import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { SelectGameButton } from '../../components/SelectGameButton'
import { theme } from '../../global/theme'
import { newbetActions } from '../../store/newbet-slice'
import { styles } from './style'
import { ItemTypes } from '../../interfaces/ItemTypes'
import { RectButton } from 'react-native-gesture-handler'
import BetButtonContainer from '../../components/BetButtonContainer';
import { cartActions } from '../../store/cart-slice';
import BetsHeader from '../../components/BetsHeader';
import { Cart } from '../../components/Cart';
import { Modal } from '../../components/Modal';

let myArray: any[] = []

interface RootState {
    newBet: {
        items: number[],
        color: string
    },
    cart: {
        cartItem: {}[],
        displayCart: boolean
    }
}

export function NewBet() {
    let myItems: number[] = useSelector((state: RootState) => state.newBet.items)
    let displayCart: boolean = useSelector((state: RootState) => state.cart.displayCart)

    const dispatch = useDispatch()

    const [modalColor, setModalColor] = useState('')
    const [modalTitle, setModalTitle] = useState('')
    const [message, setmessage] = useState('')
    const [showAlert, setShowAlert] = useState(false)

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

    const completeGame = (maxNumber: number, range: number) => {
        if (myItems.length === maxNumber) {
            clearGame()
            dispatch(newbetActions.completeGame({ maxNumber, range }))
        }
        dispatch(newbetActions.completeGame({ maxNumber, range }))
    }

    const addToCart = (numbersGame: number[], gamePrice: number, gameName: string, color: string, maxNumber: number, gameId: number) => {
        if (numbersGame.length !== maxNumber) {
            return displayAlert(`Choose more ${gameMaxNumber - myItems.length} numbers to complete your bet`, 'Error :(', 'red')
        }

        dispatch(cartActions.receiveDataFromNewBEt({ numbersGame, gamePrice, gameName, color, gameId }))

        clearGame()
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
    ) {
        dispatch(newbetActions.addItemToArray({ value, maxNumber, gamePrice, gameName }))

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

    function draggerHandler() {
        setShowBetButtons((prev) => !prev)
    }

    function Buttons() {
        myArray = []

        for (let i = 1; i <= gameRange; i++) {
            myArray.push(
                <RectButton
                    style={styles.buttonsGame}
                    onPress={() => selectButtonHandler(i, gameMaxNumber, gamePrice, gameName)}
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
        <>
            <View style={{ ...styles.container, opacity: displayCart ? 0.3 : 1 }}>
                <BetsHeader isNewBet={true} />
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

                    <View>
                        <ScrollView style={{ flexDirection: 'row', marginVertical: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                {myItems &&
                                    myItems.map((value: number) =>
                                        <RectButton
                                            onPress={() => selectButtonHandler(value, gameMaxNumber, gamePrice, gameName)}
                                            style={{ ...styles.buttonsGameInsideScroll, backgroundColor: gameColor }}>
                                            <View style={{ ...styles.buttonsGameInsideScroll, backgroundColor: gameColor }}>
                                                <Text style={{ ...styles.gameText, fontSize: 13 }}>{value}</Text>
                                                <Text style={styles.close}>X</Text>
                                            </View>
                                        </RectButton>
                                    )
                                }
                                {myItems.length === 0 &&
                                    <Text style={styles.message}>
                                        Click in the buttons to play
                                        <MaterialCommunityIcons name="gesture-tap" size={24} color={gameColor} />
                                    </Text>
                                }
                            </View>
                        </ScrollView>
                        <BetButtonContainer
                            completeGame={() => completeGame(gameMaxNumber, gameRange)}
                            clearGame={clearGame}
                            addToCart={() => addToCart(myItems, gamePrice, gameName, gameColor, gameMaxNumber, gameId)}
                        />
                    </View>
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
            {displayCart &&
                <Cart />
            }
            <Modal
                title={modalTitle}
                color={modalColor}
                showAlert={showAlert}
                callback={hideAlert}
                message={message}
            />
        </>
    )
}
