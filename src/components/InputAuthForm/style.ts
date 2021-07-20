import {StyleSheet} from 'react-native'
import { theme } from '../../global/theme'

export const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 70,
        paddingHorizontal: 20,
        fontSize: 15,
        fontFamily: theme.fonts.title700,
        color: theme.colors.secondary40,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.secondary40,
    }
})
