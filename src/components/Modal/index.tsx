import React from 'react'
import { View, Text } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts';
import { theme } from '../../global/theme';

type Props = {
    showAlert: boolean,
    callback: ()=> void,
    message: string,
    color: string,
    title: string
}

export function Modal({ showAlert, callback, message, color, title }: Props) {
    return (
        <AwesomeAlert
            titleStyle={{ fontSize: 22, fontFamily: theme.fonts.title700 }}
            contentContainerStyle={{ width: '70%' }}
            messageStyle={{ fontSize: 16, fontFamily: theme.fonts.text500, textAlign: 'center' }}
            show={showAlert}
            showProgress={false}
            title={title}
            message={message}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Ok"
            confirmButtonColor={color}
            onConfirmPressed={callback}
        />
    )
}
