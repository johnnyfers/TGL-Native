import React from 'react'
import {  TextInput } from 'react-native'
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput'

import { styles } from './style'

type Props = TextInputProps & {
    title: string,
}
export function InputAuthForm({ title, ...rest }: Props) {
    return (
        <TextInput
            {...rest}
            style={styles.input}
            placeholder={title}
        />
    )
}
