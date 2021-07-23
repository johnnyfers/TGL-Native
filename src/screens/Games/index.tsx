import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'

import BetsHeader from '../../components/BetsHeader'
import { styles } from './style'
import { ItemTypes } from '../../interfaces/ItemTypes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SelectGameButton } from '../../components/SelectGameButton'
import { GameCard } from '../../components/GameCard'

export function Games() {
    const [items, setItems] = useState([])
    const [games, setGames] = useState([])
    const [token, setToken] = useState('')

    async function getDate() {
        const user = await AsyncStorage.getItem('@token')

        if (user) {
            setToken(user)
        }
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        getDate()
        axios
            .get('http://192.168.0.104:8000/games')
            .then((res) => {
                setItems(res.data)
            })
            .catch(err => console.log(err.message))

        axios
            .get('http://192.168.0.104:8000/bets?page=1&listNumber=10',
                config
            )
            .then(res => {
                console.log('aaaa')
                setGames(res.data.data)
            })
            .catch(err => console.log(err.message))
    }, [])

    return (
        <View style={styles.container}>
            <BetsHeader />
            <Text style={styles.title}>
                RECENT GAMES
            </Text>
            <Text style={styles.subtitle}>Filters</Text>

            <View style={styles.buttonsContainer}>
                {items && items.map((item: ItemTypes, index: number) =>
                    <SelectGameButton
                        selectbackground={'transparent'}
                        selectcolor={item.color}
                        key={index}
                        item={item}
                        index={index}
                    />
                )}
            </View>

            <ScrollView>
                {games.map((item: any, index: number) =>
                    <GameCard
                        key={index}
                        type={item.games.type}
                        price={item.total_price}
                        color={item.games.color}
                        numbers={item.numbers}
                        date={item.date_string}
                        homePage={true}
                    />)
                }
            </ScrollView>
        </View>
    )
}
