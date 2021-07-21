import React from 'react'
import { View, Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { styles } from './style'
import { ItemTypes} from '../../interfaces/ItemTypes'

type Props = RectButtonProps & {
    item: ItemTypes,
    index: number,
    selectbackground: string,
    selectcolor: string
}

export function SelectGameButton({ item, index, onPress, selectcolor, selectbackground }: Props) {
    return (
        <RectButton onPress={onPress}>
            <View style={{ ...styles.buttons, borderColor: item.color , backgroundColor: selectbackground }}>
                <Text style={{ ...styles.title, color: selectcolor}} key={index}>{item.type}</Text>
            </View>
        </RectButton>
    )
}
