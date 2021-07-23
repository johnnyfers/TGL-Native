import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { AuthButtons } from '../../components/AuthButtons'
import { AuthForm } from '../../components/AuthForm'
import { AuthHeader } from '../../components/AuthHeader'
import { AuthTitle } from '../../components/AuthTitle'
import { InputAuthForm } from '../../components/InputAuthForm'
import { theme } from '../../global/theme'
import { styles } from './styles'

export function Reset() {
    const navigation = useNavigation()

    const [inputEmail, setInputEmail] = useState('')

    function handleReset(){
        axios.post('http://192.168.0.104:8000/reset', {
                email: inputEmail,
            })
                .then((res) => {
                    
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
            <AuthTitle title={"Change Password"} />
            <AuthForm>
                <InputAuthForm title="Email" />
                
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
        </View>
    )
}
