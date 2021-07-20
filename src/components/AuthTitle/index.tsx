import React from 'react'
import { Text } from 'react-native'

import { styles } from './style'

type Props = {
    title: string,
}

export function AuthTitle({title}: Props) {
    return (
        <Text style={styles.title}>
            {title}
        </Text>
    )
}
