import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Account from '../screens/Account';
import { Games } from '../screens/Games';
import { SimpleLineIcons, Feather } from '@expo/vector-icons';

const { Navigator, Screen } = createMaterialBottomTabNavigator();

export function BetsRoutes() {
    return (
        <Navigator>
            <Screen
                name="Games"
                component={Games}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <SimpleLineIcons name="home" color={color} size={26} />
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
    );
}