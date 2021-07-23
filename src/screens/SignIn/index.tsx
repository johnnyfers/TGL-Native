import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

import { AuthButtons } from '../../components/AuthButtons'
import { AuthForm } from '../../components/AuthForm'
import { AuthHeader } from '../../components/AuthHeader'
import { AuthTitle } from '../../components/AuthTitle'
import { Modal } from '../../components/Modal'
import { InputAuthForm } from '../../components/InputAuthForm'
import { theme } from '../../global/theme'
import { styles } from './styles'

export function SignIn() {
    const navigation = useNavigation()

    const [showAlert, setShowAlert] = useState(false)
    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')

    async function checkLogin() {
        const user = await AsyncStorage.getItem('@token')

        if (user) {
            navigation.navigate('TGL')
        }
    }

    function handleLogin() {
        axios.post('http://192.168.0.104:8000/sessions', {
            password: inputPassword,
            email: inputEmail,
        })
            .then(async (res) => {
                await AsyncStorage.setItem('@token', res.data.token)

                setTimeout(() => {
                    navigation.navigate('TGL')
                }, 2000)
            })
            .catch(async (err) => {
                displayAlert()
                await AsyncStorage.setItem('@token', '')
            })
    }

    const displayAlert = () => {
        setShowAlert(true)
    };

    const hideAlert = () => {
        setShowAlert(false)
    };

    function handleReset() {
        navigation.navigate('Reset')
    }

    function handleSignUp() {
        navigation.navigate('SignUp')
    }

    useEffect(() => {
        checkLogin()
    }, [])

    return (
        <View style={styles.container}>
            <AuthHeader />
            <AuthTitle title={"Authentication"} />
            <AuthForm>
                <InputAuthForm onChangeText={setInputEmail} title="Email" />
                <InputAuthForm secureTextEntry={true} onChangeText={setInputPassword} title="Password" />
                <Text
                    onPress={handleReset}
                    style={styles.forgotPasswordText}>
                    I forgot my password
                </Text>
                <AuthButtons
                    onPress={handleLogin}
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
            <Modal
                title="Error :("
                color={'red'}
                showAlert={showAlert}
                callback={hideAlert}
                message="email or password are wrong"
            />
        </View>
    )
}
