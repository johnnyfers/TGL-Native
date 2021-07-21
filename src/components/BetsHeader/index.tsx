import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './style'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { theme } from '../../global/theme';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function BetsHeader() {
    const navigation = useNavigation()
    
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>TGL</Text>
                <View style={styles.greenBar} />
            </View>

            <View style={styles.cartContainer}>
                <RectButton
                    onPress={() => navigation.navigate('Games')}
                >
                    <Ionicons
                        style={styles.icon}
                        name="cart-outline"
                        size={30}
                        color={theme.colors.secondary10}
                    />
                </RectButton>
                
                <RectButton
                    onPress={() => navigation.navigate('SignIn')}
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
