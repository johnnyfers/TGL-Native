import React, { ReactNode } from 'react'
import { styles } from './style'
import { View } from 'react-native'

type Props = {
    children: ReactNode
}

export function Background({children}: Props) {
    return (
        <View
            style={styles.container}
        >
            {children}
        </View>
    )
}