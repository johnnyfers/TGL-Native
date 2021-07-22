import {StyleSheet} from 'react-native'
import { theme } from '../../global/theme'

export const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: theme.colors.secondary10,
        margin: 5,
        paddingHorizontal: 7,
        paddingVertical: 3
    },
    text: {
        fontFamily: theme.fonts.title700,
        fontSize: 13
    }
})