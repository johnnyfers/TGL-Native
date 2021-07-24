import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { styles } from './style'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { theme } from '../../global/theme';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';

type Props = {
    isNewBet?: boolean
}

type RootState = {
    cart: {
        cartItem: {}[]
    }
}

export default function BetsHeader({ isNewBet }: Props) {
    let cartItem: {}[] = useSelector((state: RootState) => state.cart.cartItem)

    const [showAlert, setShowAlert] = useState(false)

    const navigation = useNavigation()
    const dispatch = useDispatch()

    async function logoutHandler() {
        await AsyncStorage.clear()
        navigation.navigate('SignIn')
    }

    function showCart() {
        dispatch(cartActions.showCart())
    }

    function displayAlert() {
        setShowAlert(true)
    }

    function hideAlert() {
        setShowAlert(false)
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
                    onPress={displayAlert}
                >
                    <MaterialIcons
                        name="logout"
                        size={30}
                        color={theme.colors.secondary30}
                    />
                </RectButton>
                {cartItem.length > 0 && isNewBet &&
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{cartItem.length}</Text>
                    </View>
                }
            </View>
            <AwesomeAlert
                titleStyle={{ fontSize: 22, fontFamily: theme.fonts.title700 }}
                contentContainerStyle={{ width: '70%' }}
                messageStyle={{ fontSize: 16, fontFamily: theme.fonts.text500, textAlign: 'center' }}
                show={showAlert}
                showProgress={false}
                title="Log Out"
                message="Are you sure you want logout?"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="No"
                confirmText="Yes"
                confirmButtonColor={theme.colors.secondary10}
                onCancelPressed={() => {
                    hideAlert();
                }}
                onConfirmPressed={() => {
                    logoutHandler();
                }}
            />
        </View>
    )
}
