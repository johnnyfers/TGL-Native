import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useState } from 'react'
import { View } from 'react-native'

import { AuthButtons } from '../../components/AuthButtons'
import { AuthForm } from '../../components/AuthForm'
import { AuthHeader } from '../../components/AuthHeader'
import { AuthTitle } from '../../components/AuthTitle'
import { Modal } from '../../components/Modal'
import { InputAuthForm } from '../../components/InputAuthForm'
import { theme } from '../../global/theme'
import { styles } from './styles'

export function SignUp() {
    const navigation = useNavigation()

    const [isHide, setisHide] = useState(true)
    const [modalColor, setModalColor] = useState('')
    const [modalTitle, setModalTitle] = useState('')
    const [message, setmessage] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [inputName, setInputName] = useState('')

    function handleRegister() {

        if (!inputPassword || !inputName || !inputPassword) {
            return displayAlert('please fill all the fields', 'Error :(', 'red', true)
        }

        axios.post('http://192.168.0.104:8000/users', {
            name: inputName,
            password: inputPassword,
            email: inputEmail,
        })
            .then(() => displayAlert(
                'Your accont has been created, ciclk in "OK" to go to the login page',
                'Success :)',
                theme.colors.secondary10,
                false
            )
            )
            .catch(err => {
                return displayAlert('Email already exists', 'Error :(', 'red', true)
            })
    }

    function displayAlert(message: string, title: string, color: string, callback: boolean) {
        setModalTitle(title)
        setModalColor(color)
        setmessage(message)
        setisHide(callback)

        setShowAlert(true)
    }

    function hideAlert() {
        setShowAlert(false)
    }

    function navToLogin() {
        navigation.navigate('SignIn')
        setShowAlert(false)
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
                    activeOpacity={0}
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
            <Modal
                title={modalTitle}
                color={modalColor}
                showAlert={showAlert}
                callback={isHide ? hideAlert : navToLogin}
                message={message}
            />
        </View>
    )
}
