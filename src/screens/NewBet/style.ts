import { StyleSheet } from 'react-native'
import { theme } from '../../global/theme'


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 30
    },
    buttonsContainer: {
        alignSelf: 'center',
        flexDirection: 'row'
    },
    title: {
        fontSize: 22,
        fontFamily: theme.fonts.title700,
        color: theme.colors.secondary20,
        marginBottom: 17
    },
    subtitle: {
        marginBottom: 10,
        fontSize: 17,
        fontFamily: theme.fonts.text500,
        color: theme.colors.secondary40,
    },
    scrollView: {

    },
    buttonsGame: {
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 59,
        height: 59,
        borderRadius: 100,
        backgroundColor: theme.colors.secondary30
    },
    gameText: {
        fontSize: 18,
        color: theme.colors.primary,
        fontFamily: theme.fonts.title700
    },
    dragger: {
        width: 36, 
        height: 6, 
        backgroundColor: 
        theme.colors.secondary30, 
        alignSelf: 'center', 
        borderRadius: 20,
    }
})