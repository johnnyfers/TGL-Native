import React from 'react'
import { View, Text } from 'react-native'
import { theme } from '../../global/theme'
import { ManageBetButton } from '../ManageBetButton'
import { Ionicons } from '@expo/vector-icons';

type Props = {
    completeGame: () => void,
    clearGame: () => void,
    addToCart: () => void,
}

export default function BetButtonContainer({ completeGame, clearGame, addToCart }: Props) {
    return (
        <View style={{ flexDirection: 'row' }}>
            <ManageBetButton
                callback={completeGame}
                backgroundColor='transparent'
                color={theme.colors.secondary10}
                title='Complete game' />
            <ManageBetButton
                callback={clearGame}
                backgroundColor='transparent'
                color={theme.colors.secondary10}
                title='Clear game' />
            <ManageBetButton
                callback={addToCart}
                backgroundColor={theme.colors.secondary10}
                color='#fff'
                title='Add to cart'
            >
                <Ionicons
                    name="cart-outline"
                    size={24}
                    color={theme.colors.primary}
                />
            </ManageBetButton>
        </View>
    )
}
