import React from 'react'
import { TextInput } from 'react-native'

import { styles } from './style'

type Props = {
    title: string,
}
export function InputAuthForm({ title }: Props) {
    return (
        <TextInput
            style={styles.input}
            placeholder={title}
        />
    )
}
