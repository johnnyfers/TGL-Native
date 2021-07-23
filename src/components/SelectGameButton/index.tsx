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
        <RectButton activeOpacity={0} onPress={onPress}>
            <View key={index} style={{ ...styles.buttons, borderColor: item.color , backgroundColor: selectbackground }}>
                <Text style={{ ...styles.title, color: selectcolor}} >{item.type}</Text>
            </View>
        </RectButton>
    )
}
