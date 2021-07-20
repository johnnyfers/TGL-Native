import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text } from 'react-native'
import { AuthButtons } from '../../components/AuthButtons'
import { AuthForm } from '../../components/AuthForm'
import { AuthHeader } from '../../components/AuthHeader'
import { AuthTitle } from '../../components/AuthTitle'
import { InputAuthForm } from '../../components/InputAuthForm'
import { theme } from '../../global/theme'
import { styles } from './styles'

export function SignUp() {
    const navigation = useNavigation()

    function handleSignUp() {
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <AuthHeader />
            <AuthTitle title={"Create Account"} />
            <AuthForm>
                <InputAuthForm title="Name" />
                <InputAuthForm title="Email" />
                <InputAuthForm title="Password" />
                
                <AuthButtons
                    color={theme.colors.secondary10}
                    title="Register"
                />
            </AuthForm>

            <AuthButtons
                onPress={handleSignUp}
                isOutside={true}
                color={theme.colors.secondary20}
                title="Back"
            />
        </View>
    )
}
