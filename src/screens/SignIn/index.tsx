import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { AuthButtons } from '../../components/AuthButtons'
import { AuthForm } from '../../components/AuthForm'
import { AuthHeader } from '../../components/AuthHeader'
import { AuthTitle } from '../../components/AuthTitle'
import { InputAuthForm } from '../../components/InputAuthForm'
import { theme } from '../../global/theme'

import { styles } from './styles'

export function SignIn() {
    const navigation = useNavigation()

    function handleReset() {
        navigation.navigate('Reset')
    }

    function handleSignUp() {
        navigation.navigate('SignUp')
    }

    return (
        <View style={styles.container}>
            <AuthHeader />
            <AuthTitle title={"Authentication"} />
            <AuthForm>
                <InputAuthForm title="Email" />
                <InputAuthForm title="Password" />
                <Text
                    onPress={handleReset}
                    style={styles.forgotPasswordText}>
                    I forgot my password
                </Text>
                <AuthButtons
                    color={theme.colors.secondary10}
                    title="Log In"
                />
            </AuthForm>

            <AuthButtons
                onPress={handleSignUp}
                isOutside={true}
                color={theme.colors.secondary20}
                title="Sign Up"
            />
        </View>
    )
}
