import { StyleSheet } from 'react-native'
import { theme } from '../../global/theme'

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: theme.colors.secondary30,
        marginVertical: 25,
        justifyContent: 'center'
    }
})