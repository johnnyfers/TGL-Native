import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { styles } from './style'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { theme } from '../../global/theme';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
    isNewBet?: boolean
}

export default function BetsHeader({ isNewBet }: Props) {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    async function logoutHandler(){
        await AsyncStorage.removeItem('@token')
        navigation.navigate('SignIn')
    }

    function showCart() {
        dispatch(cartActions.showCart())
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>TGL</Text>
                <View style={styles.greenBar} />
            </View>

            <View style={styles.cartContainer}>
                {isNewBet &&
                    <Ionicons
                        onPress={showCart}
                        style={styles.icon}
                        name="cart-outline"
                        size={30}
                        color={theme.colors.secondary10}
                    />
                }

                <RectButton
                    onPress={logoutHandler}
                >
                    <MaterialIcons
                        name="logout"
                        size={30}
                        color={theme.colors.secondary30}
                    />
                </RectButton>

            </View>
        </View>
    )
}
