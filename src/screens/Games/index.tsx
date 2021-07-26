import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

import BetsHeader from '../../components/BetsHeader'
import { styles } from './style'
import { ItemTypes } from '../../interfaces/ItemTypes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SelectGameButton } from '../../components/SelectGameButton'
import { GameCard } from '../../components/GameCard'
import { RectButton } from 'react-native-gesture-handler'
import { theme } from '../../global/theme';

export function Games() {
    const [gamesSelected, setGamesSelected] = useState([10])

    const [lastPage, setLastPage] = useState()
    const [page, setPage] = useState(1)
    const [items, setItems] = useState([])
    const [games, setGames] = useState([])
    const [gamesFiltered, setGamesFiltered] = useState([])

    const [token, setToken] = useState('')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    async function getDate() {
        const user = await AsyncStorage.getItem('@token')

        setToken(user!)
    }

    function nextPage() {
        if (page !== lastPage) {
            setGamesFiltered([])
            setPage((page) => page + 1)
        }
    }

    function prevPage() {
        if (page !== 1) {
            setGamesFiltered([])
            setPage((page) => page - 1)
        }
    }

    function filterGamesHandler(id: number, page: number) {
        if (gamesSelected.indexOf(id) === -1) {
            setGamesSelected((prev) => prev.concat(id))

            axios
                .get(`http://192.168.0.104:8000/bets?page=${page}&listNumber=12`,
                    config
                )
                .then(res => {
                    setGamesFiltered(prev => prev.concat(
                        res.data.data.filter((games: any) => games.games.id === id))
                    )
                })
                .catch(err => err.message)
            return
        }

        setGamesFiltered(prev => prev = prev.filter((games: any) => games.games.id !== id))
        setGamesSelected((prev) => prev = prev.filter((item) => item !== id))
    }

    useEffect(() => {
        getDate()
        axios
            .get('http://192.168.0.104:8000/games')
            .then((res) => {
                setItems(res.data)
            })
            .catch(err => err.message)

        axios
            .get(`http://192.168.0.104:8000/bets?page=${page}&listNumber=12`,
                config
            )
            .then(res => {
                setLastPage(res.data.meta.last_page)
                setGames(res.data.data)
            })
            .catch(err => err)
    }, [items])

    return (
        <View style={styles.container}>
            <BetsHeader />
            <Text style={styles.title}>
                RECENT GAMES
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.subtitle}>Filters</Text>
                <View style={{ flexDirection: 'row' }}>
                    <RectButton
                        onPress={prevPage}
                        style={styles.navButtons}>
                        <MaterialIcons name="navigate-before" size={34} color={theme.colors.secondary10} />
                    </RectButton>
                    <RectButton
                        onPress={(): void => nextPage()}
                        style={styles.navButtons}>
                        <MaterialIcons name="navigate-next" size={34} color={theme.colors.secondary10} />
                    </RectButton>
                    <Text style={{ ...styles.subtitle, alignSelf: 'center' }}>{page} / {lastPage}</Text>
                </View>
            </View>

            <View style={styles.buttonsContainer}>
                {items && items.map((item: ItemTypes, index: number) =>
                    <SelectGameButton
                        onPress={(): void => filterGamesHandler(item.id, page)}
                        selectbackground={(gamesSelected.find((id) => id === item.id) ? item.color : '#fff')}
                        selectcolor={(gamesSelected.find((id) => id === item.id) ? '#fff' : item.color)}
                        key={index}
                        item={item}
                        index={index}
                    >
                        {(gamesSelected.find((id) => id === item.id)) &&
                            <Text style={styles.close}>X</Text>
                        }
                    </SelectGameButton>
                )}
            </View>

            <ScrollView>
                {gamesFiltered.length === 0 &&
                    games.map((item: any, index: number) =>
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
                {gamesFiltered &&
                    gamesFiltered.map((item: any, index: number) =>
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
