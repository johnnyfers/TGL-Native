import { StyleSheet } from "react-native";
import { theme } from "../../global/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 36
    },
    forgotPasswordText: {
        color: theme.colors.secondary40,
        textAlign: 'right',
        margin: 30,
        marginBottom: 0
    },
    bounceImage: {
        position: 'absolute',
        alignSelf: 'center',
        width: '100%',
        height: 500,
    },
    eye: {
        padding: 20,
        position: 'absolute',
        right: 10,
        top: 70
    }
})