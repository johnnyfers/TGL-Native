import React from 'react'
import { View, Text, Image } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import { styles } from './styles'

export function IconTabBet({ onPress }: RectButtonProps) {
    
    return (
        <RectButton  onPress={onPress} >
            <View style={styles.container}>
                <Image source={require('../../assets/new.png')} style={styles.avatar} />
            </View>
        </RectButton>
    )

}