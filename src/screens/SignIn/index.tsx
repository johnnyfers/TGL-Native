import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native'
import * as Animatable from 'react-native-animatable';

import { AuthButtons } from '../../components/AuthButtons'
import { AuthForm } from '../../components/AuthForm'
import { AuthHeader } from '../../components/AuthHeader'
import { AuthTitle } from '../../components/AuthTitle'
import { Modal } from '../../components/Modal'
import { InputAuthForm } from '../../components/InputAuthForm'
import { theme } from '../../global/theme'
import { styles } from './styles'
import { LoadingPage } from '../../components/LoadingPage'
import { RectButton } from 'react-native-gesture-handler'

const goUp = {
    0: {
        bottom: -400,
    },
    0.5: {
        bottom: 150,
    },
    0.6: {},
    0.7: {},
    0.75: {
        bottom: 750,
    },
    1: {
        bottom: 2000,
    },
};

const opacityHandler = {
    0: {
        opacity: 0.3
    },
    1: {
        opacity: 1
    }
}

export function SignIn() {
    const navigation = useNavigation()

    const [passwordInvisivle, setPasswordInvisivle] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
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
                setInputEmail('')
                setInputPassword('')
                setIsLoading(true)
                await AsyncStorage.setItem('@token', res.data.token)

                setTimeout(() => {
                    setIsLoading(false)
                    navigation.navigate('TGL')
                }, 3000)
            })
            .catch(async (err) => {
                setIsLoading(false)
                displayAlert()
                await AsyncStorage.clear()
            })
    }

    function handleEye() {
        setPasswordInvisivle((prev) => !prev)
    }

    function displayAlert() {
        setShowAlert(true)
    };

    function hideAlert() {
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
        <>

            {!isLoading &&
                <Animatable.View
                    animation={opacityHandler}
                    duration={4000}
                    style={styles.container}>
                    <AuthHeader />
                    <AuthTitle title={"Authentication"} />
                    <AuthForm>
                        <InputAuthForm
                            onChangeText={setInputEmail}
                            title="Email" />
                        <InputAuthForm
                            secureTextEntry={passwordInvisivle}
                            onChangeText={setInputPassword}
                            title="Password" />
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
                        <RectButton
                            onPress={handleEye}
                            style={styles.eye}
                            activeOpacity={0}>
                            <Ionicons
                                name={passwordInvisivle ? 'eye-outline' : 'eye-off-outline'}
                                size={24}
                                color={theme.colors.secondary30} />
                        </RectButton>
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

                </Animatable.View>
            }
            {isLoading &&
                <LoadingPage />
            }
            <Animatable.Image
                animation={goUp}
                duration={4000}
                style={styles.bounceImage}
                source={require('../../assets/adaptive.png')}
            />
        </>
    )
}
