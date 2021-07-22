import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import BetsHeader from '../../components/BetsHeader'

export function Games() {
    return (
        <View style={styles.container}>
             <BetsHeader/>
            <Text>Games</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30
    }
})