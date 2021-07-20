import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'

export function AuthHeader() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>TGL</Text>
            <View style={styles.secondaryView}/>
        </View>
    )
}
