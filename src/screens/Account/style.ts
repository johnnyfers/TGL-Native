import { StyleSheet } from 'react-native'
import { theme } from '../../global/theme'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    card: {
        flexDirection: 'row',
        marginVertical: 50,
        borderRadius: 20,
        width: '100%',
        height: 100,
        backgroundColor: theme.colors.secondary30,
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 32,
        marginTop: 30
    },
    image: {
        width: 60,
        height: 56,
        borderRadius: 8
    },
    avatar: {
        marginRight: 10,
        width: 65,
        height: 61,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.secondary20
    },
    text: {
        fontSize: 16, 
        color: theme.colors.secondary20,
        fontFamily: theme.fonts.title700
    }
})