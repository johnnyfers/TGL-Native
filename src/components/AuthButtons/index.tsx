import React from 'react'
import { Text } from 'react-native'
import { RectButtonProps } from 'react-native-gesture-handler'
import { RectButton } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

type Props = RectButtonProps & {
    title: string,
    color: string,
    isOutside?: boolean
}

export function AuthButtons({ title, color, isOutside, ...rest }: Props) {
    return (
        <RectButton
            style={styles.container}
            {...rest}
        >
            <Text style={isOutside ? styles.title2: styles.title}>{title}</Text>
            <Ionicons
                name="arrow-forward-outline"
                size={34}
                color={color}
            />
        </RectButton>
    )
}
