import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useState } from 'react'
import { View } from 'react-native'

import { AuthButtons } from '../../components/AuthButtons'
import { AuthForm } from '../../components/AuthForm'
import { AuthHeader } from '../../components/AuthHeader'
import { AuthTitle } from '../../components/AuthTitle'
import { InputAuthForm } from '../../components/InputAuthForm'
import { theme } from '../../global/theme'
import { styles } from './styles'

export function SignUp() {
    const navigation = useNavigation()

    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [inputName, setInputName] = useState('')

    function handleRegister() {
        axios.post('http://192.168.0.104:8000/users', {
            name: inputName,
            password: inputPassword,
            email: inputEmail,
        })
            .catch(err => {
                return err
            })
    }

    function handleBack() {
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <AuthHeader />
            <AuthTitle title={"Create Account"} />
            <AuthForm>
                <InputAuthForm title="Name" onChangeText={setInputName} />
                <InputAuthForm title="Email" onChangeText={setInputEmail} />
                <InputAuthForm secureTextEntry={true} title="Password" onChangeText={setInputPassword} />

                <AuthButtons
                    onPress={handleRegister}
                    color={theme.colors.secondary10}
                    title="Register"
                />
            </AuthForm>

            <AuthButtons
                onPress={handleBack}
                isOutside={true}
                color={theme.colors.secondary20}
                title="Back"
            />
        </View>
    )
}
