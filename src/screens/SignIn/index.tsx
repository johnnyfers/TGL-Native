import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
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

const goUp = {
    0: {
        bottom: -400,
    },
    0.5: {
        bottom: 150,
    },
    0.6:{},
    0.7:{},
    0.75: {
        bottom: 750,
    },
    1: {
        bottom: 2000,
    },
};

export function SignIn() {
    const navigation = useNavigation()

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
        <>

            {!isLoading &&
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
