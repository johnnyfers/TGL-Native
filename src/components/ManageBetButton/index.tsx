import React, { ReactNode } from 'react'
import { View, Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { styles } from './style'

type Props = RectButtonProps & {
    title: string,
    color: string,
    backgroundColor: string,
    children?: ReactNode,
    callback?: ()=> void
}

export function ManageBetButton({ title, backgroundColor, color, children, callback }: Props) {
    return (
        <RectButton
            onPress={callback}
            style={{ ...styles.container, backgroundColor }}>
            { children }
            <Text style={{ ...styles.text, color }}>{title}</Text>
        </RectButton>
    )
}
