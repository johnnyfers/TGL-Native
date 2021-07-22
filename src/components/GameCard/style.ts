import { StyleSheet } from 'react-native'
import { theme } from '../../global/theme'

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 30,
        width: 300,
    },
    bar: {
        width: 6,
        height: 82,
        marginRight: 10,
        borderRadius: 50
    },
    trashView: {
        width: 250,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    card:{
        justifyContent: 'space-between',
    },
    numbers:{
        color: theme.colors.secondary20,
        fontFamily: theme.fonts.title700
    },
    subtitle: {
        color: theme.colors.secondary40,
        fontFamily: theme.fonts.text500
    },
    title: {
        fontFamily: theme.fonts.title700,
        fontSize: 18
    },

})