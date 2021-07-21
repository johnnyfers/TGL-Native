import {StyleSheet} from 'react-native'
import { theme } from '../../global/theme'

export const styles = StyleSheet.create({
    buttons: {
        padding: 8,
        margin: 12,
        width: 102,
        borderWidth: 3,
        borderRadius: 18,
        fontFamily: theme.fonts.title700
    },
    title: {
        textAlign: 'center',
        fontFamily: theme.fonts.title700
    }
})