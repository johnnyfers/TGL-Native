import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

type ItemTypes = {
    type: string
    description: string
    range: number
    price: number
    color: string
    'max-number': number
    'min-cart-value': number
}

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

    useEffect(() => {
        fetch('http://127.0.0.1:8000/games')
            .then(response => response.json())
            .then(data => console.log(data))
    }, [])
    
    
    return (
        <View>
            {items && items.map((item: ItemTypes, index: number)=> {
                <Text>{item.type}</Text>
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})