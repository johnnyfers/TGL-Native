import { StyleSheet} from 'react-native'
import { theme } from '../../global/theme'

export const styles = StyleSheet.create({
    container: {
        width: 83,
        height: 83,
        borderWidth: 8,
        borderColor: '#fff',
        padding: 9,
        borderRadius: 100,
        backgroundColor: theme.colors.secondary10,
        overflow: 'visible',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
    },
    avatar: {
        width: '85%',
        height: '85%',
    }
})