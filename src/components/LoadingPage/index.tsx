import React from 'react'
import { SafeAreaView } from 'react-native'
import LottieView from 'lottie-react-native';

import { styles } from './style'

export function LoadingPage() {
    return (
        <SafeAreaView style={styles.container}>
            <LottieView
                style={{
                    width: 200,
                    height: 200,
                    backgroundColor: 'transparent',
                    marginBottom: 300,
                }}
                source={require('../../assets/load.json')}
                resizeMode='contain'
                autoPlay
                autoSize
                loop />
        </SafeAreaView>
    )
}
