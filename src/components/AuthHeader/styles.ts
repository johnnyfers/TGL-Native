import { StyleSheet } from 'react-native'
import { theme } from '../../global/theme'

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 17,
        marginBottom: 46,
    },
    title: {
        fontSize: 56,
        fontFamily: theme.fonts.title700,
        color: theme.colors.secondary20
    },
    secondaryView: {
        marginTop: 5,
        borderRadius:18,
        width: 150,
        height: 8,
        backgroundColor: theme.colors.secondary10
    }
})