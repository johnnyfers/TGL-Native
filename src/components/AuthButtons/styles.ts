import {StyleSheet} from 'react-native'
import { theme } from '../../global/theme'

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 30
    },
    title: {
        marginRight: 10,
        color: theme.colors.secondary10,
        fontSize: 36,
        fontFamily: theme.fonts.text500,
    },
    title2: {
        marginRight: 10,
        color: theme.colors.secondary20,
        fontSize: 40,
        fontFamily: theme.fonts.text500,
    }
}) 