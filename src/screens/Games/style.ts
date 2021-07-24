import {StyleSheet} from 'react-native'
import { theme } from '../../global/theme'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30
    },
    title: {
        marginTop: 20,
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
    buttonsContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: 20
    },
    close:{
        color: '#fff',
        fontSize:10,
        position: 'absolute',
        top: 19,
        right: 19,
        fontFamily: theme.fonts.title700
    }
})