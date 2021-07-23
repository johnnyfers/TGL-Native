import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { AuthButtons } from '../../components/AuthButtons'
import { AuthForm } from '../../components/AuthForm'
import { AuthHeader } from '../../components/AuthHeader'
import { AuthTitle } from '../../components/AuthTitle'
import { Modal } from '../../components/Modal'
import { InputAuthForm } from '../../components/InputAuthForm'
import { theme } from '../../global/theme'
import { styles } from './styles'

export function Reset() {
    const navigation = useNavigation()

    const [isHide, setisHide] = useState(true)
    const [modalColor, setModalColor] = useState('')
    const [modalTitle, setModalTitle] = useState('')
    const [message, setmessage] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const [inputEmail, setInputEmail] = useState('')

    function handleReset() {
        if (!inputEmail) return displayAlert('Please type a valid email', 'Error :(', 'red', true)

        axios.post('http://192.168.0.104:8000/reset', {
            email: inputEmail,
        })
            .then((res) => {
                return displayAlert(
                    'Click in OK to reset your passowrd using the token that was sent through your email',
                    'Success :)',
                    'red',
                    false)
            })
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

    function navToReset() {
        navigation.navigate('Recover')
        setShowAlert(false)
    }

    function handleBack() {
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <AuthHeader />
            <AuthTitle title={"Change Password"} />
            <AuthForm>
                <InputAuthForm title="Email" onChangeText={setInputEmail} />

                <AuthButtons
                    onPress={handleReset}
                    color={theme.colors.secondary10}
                    title="Send Link"
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
                callback={isHide ? hideAlert : navToReset}
                message={message}
            />
        </View>
    )
}
