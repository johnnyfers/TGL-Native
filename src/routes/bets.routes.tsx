import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Account from '../screens/Account';
import { Games } from '../screens/Games';
import { SimpleLineIcons, Feather } from '@expo/vector-icons';
import { NewBet } from '../screens/NewBet';
import { theme } from '../global/theme';
import BetsHeader from '../components/BetsHeader';
import { useNavigation } from '@react-navigation/native';
import { IconTabBet } from '../components/IconTabBet';

const { Navigator, Screen } = createMaterialBottomTabNavigator();

export function BetsRoutes() {
    const navigation = useNavigation()

    function handleNavBet() {
        navigation.navigate('NewBet')
    }

    return (
        <>
            <Navigator
                initialRouteName="NewBet"
                activeColor={theme.colors.secondary10}
                inactiveColor={theme.colors.secondary20}
                barStyle={{
                    margin: 0,
                    opacity: 0.8,
                    backgroundColor: '#fff',
                    overflow: 'visible',
                }}
            >
                <Screen
                    name="Games"
                    component={Games}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color }) => (
                            <SimpleLineIcons name="home" color={color} size={24} />
                        ),
                    }}
                />
                <Screen
                    name="NewBet"
                    component={NewBet}
                    options={{
                        tabBarLabel: '',
                        tabBarAccessibilityLabel: 'NewBet',
                        tabBarIcon: ({ color }) => (
                            <></>
                        ),
                    }}
                />
                <Screen
                    name="Account"
                    component={Account}
                    options={{
                        tabBarLabel: 'Account',
                        tabBarIcon: ({ color }) => (
                            <Feather name="user" size={24} color={color} />
                        ),
                    }}
                />
            </Navigator>
            <IconTabBet onPress={handleNavBet} />
        </>
    );
}