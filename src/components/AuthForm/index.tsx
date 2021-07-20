import React, { ReactNode } from 'react'
import { View, Text, TextInput } from 'react-native'
import { InputAuthForm } from '../InputAuthForm'
import { styles } from './style'

type Props = {
    children: ReactNode
}

export function AuthForm({children}: Props) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}
