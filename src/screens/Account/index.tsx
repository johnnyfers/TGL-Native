import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import BetsHeader from '../../components/BetsHeader'

export default function Account() {
    return (
        <View style={styles.container}>
             <BetsHeader />
            <Text>Naveee</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30
    }
})