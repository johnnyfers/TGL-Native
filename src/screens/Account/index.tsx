import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { AuthButtons } from '../../components/AuthButtons'
import { AuthForm } from '../../components/AuthForm'
import { AuthTitle } from '../../components/AuthTitle'
import BetsHeader from '../../components/BetsHeader'
import { InputAuthForm } from '../../components/InputAuthForm'
import { Modal } from '../../components/Modal'
import { theme } from '../../global/theme'
import { styles } from './style'

export default function Account() {
    const navigation = useNavigation()

    const [isHide, setisHide] = useState(true)
    const [modalColor, setModalColor] = useState('')
    const [modalTitle, setModalTitle] = useState('')
    const [message, setmessage] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const [profileName, setProfileName] = useState('')
    const [profileEmail, setProfileEmail] = useState('')

    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [inputName, setInputName] = useState('')

    const [token, setToken] = useState('')

    async function getDate() {
        const user = await AsyncStorage.getItem('@token')

        if (user) {
            setToken(user)
        }
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    function handleUpdate() {
        if (!inputPassword || !inputName || !inputPassword) {
            return displayAlert('please fill all the fields', 'Error :(', 'red', true)
        }

        axios.put('http://192.168.0.104:8000/users', {
            name: inputName,
            password: inputPassword,
            email: inputEmail,
        }, config)
            .then(() => displayAlert(
                'Your accont has been updated succesfuly',
                'Success :)',
                theme.colors.secondary10,
                false
            )
            )
            .catch(err => {
                return displayAlert('Something went wrong, please check the fields', 'Error :(', 'red', true)
            })
    }

    useEffect(() => {
        getDate()
        
        axios.get(
            'http://192.168.0.104:8000/user',
            config
        )
            .then(response => {
                setProfileName(response.data.name)
                setProfileEmail(response.data.email)
            })
    },[handleUpdate])

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
        setShowAlert(false)
    }

    return (
        <>
            <View style={styles.container}>
                <BetsHeader />
                <View style={styles.card}>
                    <View style={styles.avatar}>
                        <Image style={styles.image} source={require('../../assets/c77.jpeg')}/>
                    </View>
                    <View>
                        <Text style={styles.text}>{profileName}</Text>
                        <Text style={styles.text}>{profileEmail}</Text>

                    </View>
                </View>
                <AuthTitle title={"Edit Profile"} />
                <AuthForm>
                    <InputAuthForm title="Name" onChangeText={setInputName} />
                    <InputAuthForm title="Email" onChangeText={setInputEmail} />
                    <InputAuthForm secureTextEntry={true} title="New Password" onChangeText={setInputPassword} />

                    <AuthButtons
                        activeOpacity={0}
                        onPress={handleUpdate}
                        color={theme.colors.secondary10}
                        title="Update"
                    />
                </AuthForm>
            </View>
            <Modal
                title={modalTitle}
                color={modalColor}
                showAlert={showAlert}
                callback={isHide ? hideAlert : navToLogin}
                message={message}
            />
        </>
    )
}