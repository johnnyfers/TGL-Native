import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../global/theme';
import { styles } from './style';

type Props = {
    numbers: number[] | string,
    price: number,
    type: string,
    color: string,
    date: string,
    deleteRow: () => void
}

export function GameCard({ type, price, numbers, color, date, deleteRow }: Props) {
    return (
        <View style={styles.container}>
            <View style={{ ...styles.bar, backgroundColor: color }} />
            <View style={styles.card}>
                <Text style={styles.numbers}>{numbers}</Text>
                <View style={styles.trashView}>
                    <Text style={styles.subtitle}>{date} - (R${price.toFixed(2).replace('.', ',')})</Text>
                    <Ionicons onPress={deleteRow} name="ios-trash-outline" size={18} color={theme.colors.secondary40} />
                </View>
                <Text style={{ ...styles.title, color: color }}>{type}</Text>
            </View>

        </View>
    )
}
