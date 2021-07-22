import { StyleSheet } from 'react-native'
import { theme } from '../../global/theme'

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 0,
        width: '75%',
        height: '100%',
        backgroundColor: '#fff',
    },
    card: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 80,
    },
    title: {
        fontSize: 22,
        fontFamily: theme.fonts.title700,
        color: theme.colors.secondary40,
        marginLeft: 10
    }
    ,
    saveButton: {
        flexDirection: 'row',
        position: 'absolute',
        backgroundColor: theme.colors.secondary30,
        height: 94,
        width: '100%',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        color: theme.colors.secondary10,
        fontFamily: theme.fonts.title700,
        fontSize: 30
    },
    close: {
        position: 'absolute',
        top: 50,
        right: 30
    },
    scroll: {
        height: '70%',
    },
    total: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 20
    },
    item1: {
        fontSize: 15,
        fontFamily: theme.fonts.title700,
        color: theme.colors.secondary20,
        marginRight: 5
    },
    item2:{
        fontSize: 15,
        fontFamily: theme.fonts.text500,
        color: theme.colors.secondary40
    }
})