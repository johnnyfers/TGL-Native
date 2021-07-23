import {StyleSheet} from 'react-native'
import { theme } from '../../global/theme'
import { Background } from '../Background'

export const styles = StyleSheet.create({
    container: {
        marginTop:46,
        width: '100%',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: -30,
    },
    title: {
        fontSize: 30,
        fontFamily: theme.fonts.title700,
        textAlign: 'center',
        color: theme.colors.secondary20
    },
    greenBar: {
        marginTop: 5,
        width: 75,
        height: 6,
        borderRadius: 20,
        backgroundColor: theme.colors.secondary10
    },
    cartContainer:{
        flexDirection: 'row'
    },
    icon: {
        marginRight: 30,
    },
    badge: {
        position: 'absolute',
        top: -5,
        left: 20,
        width: 20,
        height: 20,
        backgroundColor: theme.colors.secondary10,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2
    },
    badgeText: {
        fontSize: 12,
        fontFamily: theme.fonts.title700,
        color: theme.colors.primary
    }
}) 